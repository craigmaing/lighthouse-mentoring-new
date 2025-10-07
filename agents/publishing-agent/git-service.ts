/**
 * Git Service for Publishing Agent
 *
 * Handles git operations for automated deployment
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import type { GitStatus } from './types';

const execAsync = promisify(exec);

export class GitService {
  private repoPath: string;

  constructor(repoPath: string = process.cwd()) {
    this.repoPath = repoPath;
  }

  /**
   * Get current git status
   */
  async getStatus(): Promise<GitStatus> {
    try {
      // Get current branch
      const { stdout: branchOutput } = await execAsync('git branch --show-current', {
        cwd: this.repoPath
      });
      const branch = branchOutput.trim();

      // Get staged files
      const { stdout: stagedOutput } = await execAsync('git diff --name-only --cached', {
        cwd: this.repoPath
      });
      const stagedFiles = stagedOutput.trim().split('\n').filter(f => f);

      // Get unstaged files
      const { stdout: unstagedOutput } = await execAsync('git diff --name-only', {
        cwd: this.repoPath
      });
      const unstagedFiles = unstagedOutput.trim().split('\n').filter(f => f);

      // Get untracked files
      const { stdout: untrackedOutput } = await execAsync('git ls-files --others --exclude-standard', {
        cwd: this.repoPath
      });
      const untrackedFiles = untrackedOutput.trim().split('\n').filter(f => f);

      const hasChanges = stagedFiles.length > 0 || unstagedFiles.length > 0 || untrackedFiles.length > 0;

      return {
        branch,
        hasChanges,
        stagedFiles,
        unstagedFiles: [...unstagedFiles, ...untrackedFiles]
      };
    } catch (error) {
      throw new Error(`Failed to get git status: ${error}`);
    }
  }

  /**
   * Add file to staging
   */
  async add(filePath: string): Promise<void> {
    try {
      await execAsync(`git add "${filePath}"`, {
        cwd: this.repoPath
      });
      console.log(`   ✅ Staged: ${filePath}`);
    } catch (error) {
      throw new Error(`Failed to stage file: ${error}`);
    }
  }

  /**
   * Commit staged changes
   */
  async commit(message: string): Promise<void> {
    try {
      await execAsync(`git commit -m "${message}"`, {
        cwd: this.repoPath
      });
      console.log(`   ✅ Committed: ${message}`);
    } catch (error) {
      throw new Error(`Failed to commit changes: ${error}`);
    }
  }

  /**
   * Push to remote
   */
  async push(branch?: string): Promise<void> {
    try {
      const pushCommand = branch ? `git push origin ${branch}` : 'git push';
      await execAsync(pushCommand, {
        cwd: this.repoPath
      });
      console.log(`   ✅ Pushed to ${branch || 'origin'}`);
    } catch (error) {
      throw new Error(`Failed to push to remote: ${error}`);
    }
  }

  /**
   * Full git workflow: add, commit, push
   */
  async publishChanges(filePath: string, commitMessage: string, options: {
    autoPush?: boolean;
    branch?: string;
  } = {}): Promise<void> {
    try {
      // Add file
      await this.add(filePath);

      // Commit
      await this.commit(commitMessage);

      // Push if enabled
      if (options.autoPush) {
        await this.push(options.branch);
      }
    } catch (error) {
      throw new Error(`Git workflow failed: ${error}`);
    }
  }

  /**
   * Check if repository is clean
   */
  async isClean(): Promise<boolean> {
    const status = await this.getStatus();
    return !status.hasChanges;
  }

  /**
   * Get current branch name
   */
  async getCurrentBranch(): Promise<string> {
    try {
      const { stdout } = await execAsync('git branch --show-current', {
        cwd: this.repoPath
      });
      return stdout.trim();
    } catch (error) {
      throw new Error(`Failed to get current branch: ${error}`);
    }
  }
}
