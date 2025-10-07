/**
 * Unsplash API Service
 *
 * Handles searching and downloading images from Unsplash
 * Uses official Unsplash JS SDK
 */

import { createApi } from 'unsplash-js';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
  };
  links: {
    download_location: string;
  };
  user: {
    name: string;
    username: string;
  };
  description: string | null;
  alt_description: string | null;
  width: number;
  height: number;
}

export class UnsplashService {
  private api: ReturnType<typeof createApi>;
  private accessKey: string;

  constructor(accessKey?: string) {
    this.accessKey = accessKey || process.env.UNSPLASH_ACCESS_KEY || '';

    if (!this.accessKey) {
      throw new Error('UNSPLASH_ACCESS_KEY is required. Get one at https://unsplash.com/developers');
    }

    this.api = createApi({
      accessKey: this.accessKey,
    });
  }

  /**
   * Search for images on Unsplash
   */
  async search(query: string, options: { perPage?: number; orientation?: 'landscape' | 'portrait' | 'squarish' } = {}): Promise<UnsplashImage[]> {
    console.log(`   🔍 Searching Unsplash for: "${query}"`);

    try {
      const result = await this.api.search.getPhotos({
        query,
        perPage: options.perPage || 5,
        orientation: options.orientation || 'landscape',
      });

      if (result.errors) {
        console.error(`   ❌ Unsplash API error:`, result.errors);
        return [];
      }

      if (!result.response) {
        console.error(`   ❌ No response from Unsplash`);
        return [];
      }

      const images = result.response.results.map(photo => ({
        id: photo.id,
        urls: photo.urls,
        links: photo.links,
        user: photo.user,
        description: photo.description,
        alt_description: photo.alt_description,
        width: photo.width,
        height: photo.height,
      }));

      console.log(`   ✅ Found ${images.length} images`);
      return images;

    } catch (error) {
      console.error(`   ❌ Search error:`, error);
      return [];
    }
  }

  /**
   * Download an image from Unsplash
   * Also triggers download tracking for Unsplash attribution
   */
  async downloadImage(image: UnsplashImage, outputPath: string): Promise<boolean> {
    console.log(`   📥 Downloading: ${image.id} by ${image.user.name}`);

    try {
      // Trigger download tracking (required by Unsplash API Guidelines)
      await this.api.photos.trackDownload({
        downloadLocation: image.links.download_location,
      });

      // Download the image
      const imageUrl = `${image.urls.raw}&w=1600&q=80`; // Request optimized size from Unsplash

      return new Promise((resolve, reject) => {
        https.get(imageUrl, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`Failed to download: ${response.statusCode}`));
            return;
          }

          const fileStream = fs.createWriteStream(outputPath);
          response.pipe(fileStream);

          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`   ✅ Downloaded to: ${path.basename(outputPath)}`);
            resolve(true);
          });

          fileStream.on('error', (err) => {
            fs.unlink(outputPath, () => {}); // Delete partial file
            reject(err);
          });
        }).on('error', reject);
      });

    } catch (error) {
      console.error(`   ❌ Download error:`, error);
      return false;
    }
  }

  /**
   * Get attribution text for an image (required by Unsplash)
   */
  getAttribution(image: UnsplashImage): string {
    return `Photo by [${image.user.name}](https://unsplash.com/@${image.user.username}?utm_source=lighthouse-mentoring&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=lighthouse-mentoring&utm_medium=referral)`;
  }

  /**
   * Search and select best image based on criteria
   */
  async findBestImage(
    query: string,
    preferences: {
      orientation?: 'landscape' | 'portrait' | 'squarish';
      minWidth?: number;
      preferredKeywords?: string[];
    } = {}
  ): Promise<UnsplashImage | null> {
    const images = await this.search(query, {
      perPage: 10,
      orientation: preferences.orientation || 'landscape',
    });

    if (images.length === 0) {
      return null;
    }

    // Filter by minimum width if specified
    let filtered = images;
    if (preferences.minWidth) {
      filtered = filtered.filter(img => img.width >= preferences.minWidth);
    }

    // Score images based on preferred keywords in description
    if (preferences.preferredKeywords && preferences.preferredKeywords.length > 0) {
      filtered = filtered.map(img => {
        let score = 0;
        const text = `${img.description || ''} ${img.alt_description || ''}`.toLowerCase();

        preferences.preferredKeywords!.forEach(keyword => {
          if (text.includes(keyword.toLowerCase())) {
            score += 1;
          }
        });

        return { ...img, score };
      }).sort((a, b) => (b as any).score - (a as any).score);
    }

    // Return the best match
    return filtered[0] || images[0];
  }
}
