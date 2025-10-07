/**
 * Publishing Agent
 *
 * Automated deployment of blog posts to Astro site with git integration
 *
 * Workflow:
 * 1. Create/update blog post markdown file
 * 2. Stage file in git
 * 3. Commit with descriptive message
 * 4. Push to remote (optional)
 * 5. (Future) Submit to Google Search Console
 */

import { DeploymentService } from './deployment-service';
import { GitService } from './git-service';
import { TaxonomyService } from './taxonomy-service';
import type { BlogPost, PublishOptions, PublishResult } from './types';

export class PublishingAgent {
  private deploymentService: DeploymentService;
  private gitService: GitService;
  private taxonomyService: TaxonomyService;

  constructor(contentDir: string = 'src/pages/insights', repoPath?: string) {
    this.deploymentService = new DeploymentService(contentDir);
    this.gitService = new GitService(repoPath);
    this.taxonomyService = new TaxonomyService();
  }

  /**
   * Publish a new blog post
   */
  async publish(post: BlogPost, options: PublishOptions = {}): Promise<PublishResult> {
    const {
      autoCommit = true,
      autoPush = false,
      commitMessage,
      branch,
      autoTag = true,
      autoCategory = true
    } = options;

    const warnings: string[] = [];
    let filePath: string | null = null;
    let committed = false;
    let pushed = false;
    let taxonomyResult;

    try {
      console.log(`\n📝 Publishing blog post: ${post.title}`);
      console.log(`   Slug: ${post.slug}\n`);

      // Auto-generate taxonomy if enabled
      if (autoTag || autoCategory) {
        taxonomyResult = await this.taxonomyService.analyseTaxonomy(
          post.title,
          post.content
        );

        // Auto-tag if no tags provided or if autoTag is enabled
        if (autoTag && (!post.tags || post.tags.length === 0)) {
          post.tags = taxonomyResult.suggestedTags;
          console.log(`   🏷️  Auto-generated ${post.tags.length} tags`);
        }

        // Auto-categorize if no category provided
        if (autoCategory && !post.category) {
          post.category = taxonomyResult.primaryCategory;
          post.categories = [taxonomyResult.primaryCategory, ...taxonomyResult.secondaryCategories];
          console.log(`   📁 Auto-categorized as: ${post.category}`);
        }
      }

      // Check if post already exists
      const exists = await this.deploymentService.exists(post.slug);
      if (exists) {
        warnings.push('Blog post already exists - updating instead of creating');
        console.log(`   ⚠️  Post exists - updating...`);
        filePath = await this.deploymentService.updateBlogPost(post);
      } else {
        filePath = await this.deploymentService.createBlogPost(post);
      }

      // Git workflow (if enabled)
      if (autoCommit) {
        console.log(`\n🔧 Git workflow...`);

        // Check git status
        const status = await this.gitService.getStatus();
        console.log(`   Current branch: ${status.branch}`);

        // Generate commit message
        const defaultCommitMessage = exists
          ? `Update blog post: ${post.title}`
          : `Publish blog post: ${post.title}`;
        const finalCommitMessage = commitMessage || defaultCommitMessage;

        // Add, commit, and optionally push
        await this.gitService.publishChanges(filePath, finalCommitMessage, {
          autoPush,
          branch: branch || status.branch
        });

        committed = true;

        if (autoPush) {
          pushed = true;
        }
      }

      console.log(`\n✅ Publishing complete!`);
      console.log(`   File: ${filePath}`);
      if (committed) {
        console.log(`   Git: Committed${pushed ? ' and pushed' : ''}`);
      }

      return {
        success: true,
        slug: post.slug,
        filePath,
        committed,
        pushed,
        warnings,
        taxonomy: taxonomyResult ? {
          tags: post.tags,
          category: post.category || taxonomyResult.primaryCategory,
          secondaryCategories: taxonomyResult.secondaryCategories
        } : undefined
      };

    } catch (error: any) {
      console.error(`\n❌ Publishing failed: ${error.message}`);

      return {
        success: false,
        slug: post.slug,
        filePath: filePath || '',
        committed,
        pushed,
        error: error.message,
        warnings
      };
    }
  }

  /**
   * Unpublish (delete) a blog post
   */
  async unpublish(slug: string, options: PublishOptions = {}): Promise<PublishResult> {
    const {
      autoCommit = true,
      autoPush = false,
      commitMessage,
      branch
    } = options;

    const warnings: string[] = [];
    let committed = false;
    let pushed = false;

    try {
      console.log(`\n🗑️  Unpublishing blog post: ${slug}\n`);

      // Check if post exists
      const exists = await this.deploymentService.exists(slug);
      if (!exists) {
        throw new Error('Blog post does not exist');
      }

      // Delete the post
      await this.deploymentService.deleteBlogPost(slug);

      const filePath = `src/pages/insights/${slug}.md`;

      // Git workflow (if enabled)
      if (autoCommit) {
        console.log(`\n🔧 Git workflow...`);

        const status = await this.gitService.getStatus();
        const finalCommitMessage = commitMessage || `Unpublish blog post: ${slug}`;

        await this.gitService.publishChanges(filePath, finalCommitMessage, {
          autoPush,
          branch: branch || status.branch
        });

        committed = true;

        if (autoPush) {
          pushed = true;
        }
      }

      console.log(`\n✅ Unpublishing complete!`);

      return {
        success: true,
        slug,
        filePath,
        committed,
        pushed,
        warnings
      };

    } catch (error: any) {
      console.error(`\n❌ Unpublishing failed: ${error.message}`);

      return {
        success: false,
        slug,
        filePath: '',
        committed,
        pushed,
        error: error.message,
        warnings
      };
    }
  }

  /**
   * List all published blog posts
   */
  async listPublished(): Promise<string[]> {
    return await this.deploymentService.listBlogPosts();
  }

  /**
   * Get git status
   */
  async getGitStatus() {
    return await this.gitService.getStatus();
  }
}

// Export types
export type { BlogPost, PublishOptions, PublishResult } from './types';
