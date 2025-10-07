/**
 * Publishing Agent Types
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  author: string;
  tags: string[];
  category?: string;              // Primary category
  categories?: string[];          // All applicable categories
  content: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export interface PublishOptions {
  autoCommit?: boolean;
  autoPush?: boolean;
  commitMessage?: string;
  branch?: string;
  autoTag?: boolean;              // Automatically generate tags if not provided
  autoCategory?: boolean;         // Automatically determine category if not provided
}

export interface PublishResult {
  success: boolean;
  slug: string;
  filePath: string;
  committed?: boolean;
  pushed?: boolean;
  error?: string;
  warnings: string[];
  taxonomy?: {
    tags: string[];
    category: string;
    secondaryCategories: string[];
  };
}

export interface GitStatus {
  branch: string;
  hasChanges: boolean;
  stagedFiles: string[];
  unstagedFiles: string[];
}
