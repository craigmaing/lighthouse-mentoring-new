/**
 * Image Optimization Service
 *
 * Uses sharp to generate multiple formats and sizes
 * Follows Astro best practices for performance
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface OptimizationOptions {
  widths?: number[];
  formats?: ('avif' | 'webp' | 'jpg' | 'png')[];
  quality?: number;
  outputDir?: string;
}

export interface OptimizedImageSet {
  original: string;
  optimized: {
    width: number;
    format: string;
    path: string;
    size: number; // File size in bytes
  }[];
  metadata: {
    originalWidth: number;
    originalHeight: number;
    aspectRatio: number;
  };
}

export class ImageOptimizer {
  private defaultWidths = [400, 800, 1200, 1600];
  private defaultFormats: ('avif' | 'webp' | 'jpg')[] = ['avif', 'webp', 'jpg'];
  private defaultQuality = 80;

  /**
   * Optimize a single image into multiple formats and sizes
   */
  async optimize(
    inputPath: string,
    outputBaseName: string,
    options: OptimizationOptions = {}
  ): Promise<OptimizedImageSet> {
    console.log(`   🔧 Optimizing: ${path.basename(inputPath)}`);

    const widths = options.widths || this.defaultWidths;
    const formats = options.formats || this.defaultFormats;
    const quality = options.quality || this.defaultQuality;
    const outputDir = options.outputDir || path.dirname(inputPath);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Get image metadata
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Could not read image dimensions');
    }

    const optimized: OptimizedImageSet['optimized'] = [];

    // Generate all combinations of widths and formats
    for (const width of widths) {
      // Skip if width is larger than original
      if (width > metadata.width) {
        continue;
      }

      for (const format of formats) {
        const outputFilename = `${outputBaseName}-${width}w.${format}`;
        const outputPath = path.join(outputDir, outputFilename);

        try {
          let processor = sharp(inputPath).resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          });

          // Apply format-specific optimization
          switch (format) {
            case 'avif':
              processor = processor.avif({ quality, effort: 4 }); // effort 4 = good balance
              break;
            case 'webp':
              processor = processor.webp({ quality, effort: 4 });
              break;
            case 'jpg':
              processor = processor.jpeg({ quality, progressive: true, mozjpeg: true });
              break;
            case 'png':
              processor = processor.png({ compressionLevel: 9, adaptiveFiltering: true });
              break;
          }

          // Save the optimized image
          await processor.toFile(outputPath);

          // Get file size
          const stats = await fs.stat(outputPath);

          optimized.push({
            width,
            format,
            path: outputPath,
            size: stats.size,
          });

          console.log(`      ✓ ${width}w ${format.toUpperCase()} - ${this.formatBytes(stats.size)}`);

        } catch (error) {
          console.error(`      ❌ Failed to generate ${width}w ${format}:`, error);
        }
      }
    }

    console.log(`   ✅ Generated ${optimized.length} optimized versions`);

    return {
      original: inputPath,
      optimized,
      metadata: {
        originalWidth: metadata.width,
        originalHeight: metadata.height,
        aspectRatio: metadata.width / metadata.height,
      },
    };
  }

  /**
   * Optimize multiple images in batch
   */
  async optimizeBatch(
    images: { inputPath: string; outputBaseName: string }[],
    options: OptimizationOptions = {}
  ): Promise<OptimizedImageSet[]> {
    console.log(`\n🔧 Optimizing ${images.length} images in batch...\n`);

    const results: OptimizedImageSet[] = [];

    for (const { inputPath, outputBaseName } of images) {
      try {
        const result = await this.optimize(inputPath, outputBaseName, options);
        results.push(result);
      } catch (error) {
        console.error(`   ❌ Failed to optimize ${inputPath}:`, error);
      }
    }

    console.log(`\n✅ Batch optimization complete: ${results.length}/${images.length} successful\n`);

    return results;
  }

  /**
   * Generate srcset string for HTML
   */
  generateSrcSet(images: OptimizedImageSet['optimized'], format: string): string {
    return images
      .filter(img => img.format === format)
      .map(img => `${path.basename(img.path)} ${img.width}w`)
      .join(', ');
  }

  /**
   * Generate Astro Picture component code
   */
  generateAstroPictureCode(
    imageName: string,
    altText: string,
    imageSet: OptimizedImageSet,
    loading: 'eager' | 'lazy' = 'lazy'
  ): string {
    const widths = [...new Set(imageSet.optimized.map(img => img.width))].sort((a, b) => a - b);
    const formats = [...new Set(imageSet.optimized.map(img => img.format))];

    return `<Picture
  src={import('./images/${imageName}.${imageSet.optimized[0].format}')}
  widths={[${widths.join(', ')}]}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1536px) 1200px, 1600px"
  formats={[${formats.map(f => `'${f}'`).join(', ')}]}
  alt="${altText}"
  loading="${loading}"
  class="w-full h-auto"
/>`;
  }

  /**
   * Generate Astro Image component code for simpler cases
   */
  generateAstroImageCode(
    imageName: string,
    altText: string,
    width: number,
    format: string = 'webp',
    loading: 'eager' | 'lazy' = 'lazy'
  ): string {
    return `<Image
  src={import('./images/${imageName}.${format}')}
  width={${width}}
  height={${Math.round(width * 0.5625)}} // 16:9 aspect ratio
  format="${format}"
  alt="${altText}"
  loading="${loading}"
  class="w-full h-auto rounded-lg shadow-sm"
/>`;
  }

  /**
   * Format bytes to human-readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /**
   * Calculate total savings from optimization
   */
  calculateSavings(originalSize: number, optimizedSets: OptimizedImageSet[]): {
    original: number;
    optimized: number;
    saved: number;
    percentage: number;
  } {
    const totalOptimized = optimizedSets.reduce(
      (sum, set) => sum + set.optimized.reduce((s, img) => s + img.size, 0),
      0
    );

    const totalOriginal = originalSize * optimizedSets.length;
    const saved = totalOriginal - totalOptimized;
    const percentage = (saved / totalOriginal) * 100;

    return {
      original: totalOriginal,
      optimized: totalOptimized,
      saved,
      percentage,
    };
  }
}
