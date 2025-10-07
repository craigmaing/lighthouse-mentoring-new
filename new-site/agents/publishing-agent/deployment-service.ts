/**
 * Deployment Service for Publishing Agent
 *
 * Handles creation of blog post files in Astro content collections
 */

import fs from 'fs/promises';
import path from 'path';
import type { BlogPost } from './types';

export class DeploymentService {
  private contentDir: string;

  constructor(contentDir: string = 'src/pages/insights') {
    this.contentDir = contentDir;
  }

  /**
   * Generate frontmatter for blog post
   */
  private generateFrontmatter(post: BlogPost): string {
    let frontmatter = '---\n';
    frontmatter += `title: "${post.title.replace(/"/g, '\\"')}"\n`;
    frontmatter += `description: "${post.description.replace(/"/g, '\\"')}"\n`;
    frontmatter += `pubDate: "${post.pubDate}"\n`;
    frontmatter += `author: "${post.author}"\n`;

    // Add category if provided
    if (post.category) {
      frontmatter += `category: "${post.category}"\n`;
    }

    // Add all categories if provided
    if (post.categories && post.categories.length > 0) {
      frontmatter += `categories: [${post.categories.map(cat => `"${cat}"`).join(', ')}]\n`;
    }

    frontmatter += `tags: [${post.tags.map(tag => `"${tag}"`).join(', ')}]\n`;

    if (post.heroImage) {
      frontmatter += `heroImage: "${post.heroImage}"\n`;
    }

    if (post.heroImageAlt) {
      frontmatter += `heroImageAlt: "${post.heroImageAlt.replace(/"/g, '\\"')}"\n`;
    }

    frontmatter += '---\n\n';

    return frontmatter;
  }

  /**
   * Create blog post markdown file
   */
  async createBlogPost(post: BlogPost): Promise<string> {
    try {
      // Ensure content directory exists
      const fullContentPath = path.join(process.cwd(), this.contentDir);
      await fs.mkdir(fullContentPath, { recursive: true });

      // Generate file path
      const fileName = `${post.slug}.md`;
      const filePath = path.join(fullContentPath, fileName);

      // Check if file already exists
      try {
        await fs.access(filePath);
        throw new Error(`Blog post already exists: ${fileName}`);
      } catch (error: any) {
        // File doesn't exist, continue
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }

      // Generate complete markdown content
      const frontmatter = this.generateFrontmatter(post);
      const fullContent = frontmatter + post.content;

      // Write file
      await fs.writeFile(filePath, fullContent, 'utf-8');

      console.log(`   ✅ Created blog post: ${filePath}`);

      return filePath;
    } catch (error) {
      throw new Error(`Failed to create blog post: ${error}`);
    }
  }

  /**
   * Update existing blog post
   */
  async updateBlogPost(post: BlogPost): Promise<string> {
    try {
      const fileName = `${post.slug}.md`;
      const filePath = path.join(process.cwd(), this.contentDir, fileName);

      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (error) {
        throw new Error(`Blog post does not exist: ${fileName}`);
      }

      // Generate complete markdown content
      const frontmatter = this.generateFrontmatter(post);
      const fullContent = frontmatter + post.content;

      // Write file
      await fs.writeFile(filePath, fullContent, 'utf-8');

      console.log(`   ✅ Updated blog post: ${filePath}`);

      return filePath;
    } catch (error) {
      throw new Error(`Failed to update blog post: ${error}`);
    }
  }

  /**
   * Delete blog post
   */
  async deleteBlogPost(slug: string): Promise<void> {
    try {
      const fileName = `${slug}.md`;
      const filePath = path.join(process.cwd(), this.contentDir, fileName);

      await fs.unlink(filePath);

      console.log(`   ✅ Deleted blog post: ${filePath}`);
    } catch (error) {
      throw new Error(`Failed to delete blog post: ${error}`);
    }
  }

  /**
   * List all blog posts
   */
  async listBlogPosts(): Promise<string[]> {
    try {
      const fullContentPath = path.join(process.cwd(), this.contentDir);
      const files = await fs.readdir(fullContentPath);

      return files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
    } catch (error) {
      throw new Error(`Failed to list blog posts: ${error}`);
    }
  }

  /**
   * Check if blog post exists
   */
  async exists(slug: string): Promise<boolean> {
    try {
      const fileName = `${slug}.md`;
      const filePath = path.join(process.cwd(), this.contentDir, fileName);

      await fs.access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }
}
