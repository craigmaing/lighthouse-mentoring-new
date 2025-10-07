# Publishing Agent

Automated blog post publishing system with automatic tagging, categorization, and git integration for Lighthouse Mentoring's Astro website.

## Features

### ✅ Automated Taxonomy
- **Auto-Tagging**: Intelligently generates relevant tags based on content analysis
- **Auto-Categorization**: Determines primary and secondary categories using keyword matching
- **UK English Support**: All tags use proper UK English spelling (Organisational, not Organizational)

### ✅ Content Deployment
- Creates markdown files in Astro content collection format
- Generates proper frontmatter with all metadata
- Supports hero images and image alt text
- Updates existing posts seamlessly

### ✅ Git Integration
- Automatic staging of new/updated posts
- Intelligent commit messages
- Optional push to remote repository
- Git status monitoring

### ✅ QA Integration
- Works seamlessly with QA Agent for pre-publish validation
- Recommended workflow: QA Check → Auto-tag → Publish → Git commit

## Installation

Already installed as part of the agent system. No additional dependencies required beyond:
- `natural` (NLP for taxonomy)
- `tsx` (TypeScript execution)

## Usage

### Basic Publishing

```typescript
import { PublishingAgent } from './agents/publishing-agent';

const agent = new PublishingAgent();

const post = {
  slug: 'executive-coaching-roi',
  title: 'Measuring Executive Coaching ROI',
  description: 'Framework for demonstrating coaching value',
  pubDate: '2025-01-15',
  author: 'Craig Fearn',
  tags: [], // Auto-generated if empty
  content: '...' // Full markdown content
};

const result = await agent.publish(post, {
  autoTag: true,        // Generate tags automatically
  autoCategory: true,   // Determine category automatically
  autoCommit: true,     // Commit to git
  autoPush: false       // Don't push to remote (manual review)
});

console.log(result.taxonomy);
// {
//   tags: ['Executive Coaching', 'Leadership Development', 'ROI'],
//   category: 'executive-coaching',
//   secondaryCategories: ['performance', 'leadership']
// }
```

### CLI Usage

```bash
# Run the demo/example
npm run agent:publish
```

### Full Workflow (Recommended)

```typescript
import { PublishingAgent } from './agents/publishing-agent';
import { QAAgent } from './agents/qa-agent';

const qaAgent = new QAAgent();
const publishingAgent = new PublishingAgent();

// 1. Run QA check
const qaReport = await qaAgent.checkPost(slug, content, frontmatter);

// 2. Only publish if QA passes
if (qaReport.readyToPublish) {
  const result = await publishingAgent.publish(post, {
    autoTag: true,
    autoCategory: true,
    autoCommit: true,
    autoPush: false
  });

  if (result.success) {
    console.log('Published successfully!');
    console.log('Tags:', result.taxonomy.tags);
    console.log('Category:', result.taxonomy.category);
  }
} else {
  console.log('QA failed - fix issues before publishing');
  console.log('Critical issues:', qaReport.criticalIssues);
}
```

## Taxonomy System

### Available Categories

1. **executive-coaching** - Executive and leadership coaching
2. **board-advisory** - Board advisory and NED work
3. **wellbeing** - Organizational wellbeing and mental health
4. **leadership** - General leadership development
5. **organizational-development** - Change management and transformation
6. **performance** - Performance management and productivity

### Common Tags (UK English)

- Executive Coaching
- Leadership Development
- Board Advisory
- Organisational Wellbeing
- Workplace Wellbeing
- Mental Health
- Resilience
- C-Suite
- CEO
- Board of Directors
- Non-Executive Director
- Strategic Leadership
- Governance
- Performance Management
- Change Management
- Team Development
- Psychological Safety
- Work-Life Balance
- Burnout Prevention
- Corporate Culture

### How Auto-Tagging Works

1. **Content Analysis**: Tokenizes title and content
2. **Keyword Matching**: Finds mentions of common tags and categories
3. **Category Scoring**: Calculates relevance scores for each category
4. **Tag Selection**: Chooses 5-7 most relevant tags
5. **UK English**: All tags follow UK spelling conventions

### How Auto-Categorization Works

1. **Keyword Weighting**: Each category has weighted keywords
2. **Content Scoring**: Counts keyword matches in content
3. **Primary Selection**: Highest-scoring category becomes primary
4. **Secondary Categories**: Next 1-2 categories added as secondary

## Git Workflow

### Default Behavior

```typescript
// With autoCommit: true (default)
await agent.publish(post);
// → Creates file
// → Stages file (git add)
// → Commits with message "Publish blog post: {title}"
// → Does NOT push (requires autoPush: true)
```

### Custom Commit Messages

```typescript
await agent.publish(post, {
  autoCommit: true,
  commitMessage: 'Add new wellbeing ROI framework post'
});
```

### Push to Remote

```typescript
await agent.publish(post, {
  autoCommit: true,
  autoPush: true,  // CAREFUL: Pushes immediately
  branch: 'main'
});
```

### Git Status Check

```typescript
const status = await agent.getGitStatus();

console.log('Current branch:', status.branch);
console.log('Has changes:', status.hasChanges);
console.log('Staged files:', status.stagedFiles);
```

## API Reference

### `PublishingAgent`

#### Constructor

```typescript
new PublishingAgent(
  contentDir?: string,  // Default: 'src/pages/insights'
  repoPath?: string     // Default: process.cwd()
)
```

#### Methods

**`publish(post: BlogPost, options?: PublishOptions): Promise<PublishResult>`**

Publish a new blog post or update an existing one.

**Options:**
- `autoCommit` (default: `true`) - Automatically commit to git
- `autoPush` (default: `false`) - Automatically push to remote
- `commitMessage` (optional) - Custom commit message
- `branch` (optional) - Target branch (uses current by default)
- `autoTag` (default: `true`) - Generate tags if not provided
- `autoCategory` (default: `true`) - Determine category if not provided

**`unpublish(slug: string, options?: PublishOptions): Promise<PublishResult>`**

Delete a published blog post.

**`listPublished(): Promise<string[]>`**

Get list of all published blog post slugs.

**`getGitStatus(): Promise<GitStatus>`**

Get current git repository status.

### Types

**BlogPost**
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;         // YYYY-MM-DD format
  author: string;
  tags: string[];
  category?: string;       // Primary category
  categories?: string[];   // All categories
  content: string;         // Full markdown content
  heroImage?: string;
  heroImageAlt?: string;
}
```

**PublishResult**
```typescript
interface PublishResult {
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
```

## Best Practices

### 1. Always Run QA First

```typescript
// ✅ GOOD: QA check before publishing
const qaReport = await qaAgent.checkPost(...);
if (qaReport.readyToPublish) {
  await publishingAgent.publish(post);
}

// ❌ BAD: Publish without QA check
await publishingAgent.publish(post);
```

### 2. Review Before Pushing

```typescript
// ✅ GOOD: Commit locally, review, then push manually
await agent.publish(post, {
  autoCommit: true,
  autoPush: false  // Review commit before pushing
});

// ❌ RISKY: Auto-push without review
await agent.publish(post, {
  autoPush: true  // Pushes immediately!
});
```

### 3. Provide Manual Tags for Critical Posts

```typescript
// ✅ GOOD: Specific tags for important posts
const post = {
  ...postData,
  tags: ['Executive Coaching', 'ROI', 'Board Advisory'],
  category: 'executive-coaching'
};

await agent.publish(post, {
  autoTag: false,      // Don't override manual tags
  autoCategory: false  // Don't override manual category
});
```

### 4. Use Consistent Slug Format

```typescript
// ✅ GOOD: Kebab-case, descriptive slugs
slug: 'executive-coaching-roi-framework'
slug: 'board-advisory-governance-guide'
slug: 'wellbeing-audit-methodology'

// ❌ BAD: Unclear or inconsistent slugs
slug: 'post1'
slug: 'Blog_Post_Title'
slug: 'coaching'
```

## Error Handling

```typescript
const result = await agent.publish(post);

if (!result.success) {
  console.error('Publishing failed:', result.error);

  // Handle specific errors
  if (result.error?.includes('already exists')) {
    // Post already exists - update instead?
  }

  if (result.error?.includes('git')) {
    // Git operation failed
  }
}

// Check warnings even on success
if (result.warnings.length > 0) {
  console.warn('Warnings:', result.warnings);
}
```

## Future Enhancements

- [ ] Google Search Console submission integration
- [ ] Social media auto-posting
- [ ] Email newsletter integration
- [ ] Automatic internal linking suggestions
- [ ] SEO metadata validation
- [ ] Image optimization integration
- [ ] Related posts suggestions

## Testing

Run the demo to see the Publishing Agent in action:

```bash
npm run agent:publish
```

This demonstrates:
1. Basic publishing with auto-tagging
2. QA integration workflow
3. Taxonomy generation
4. Git operations (dry-run mode)

## Troubleshooting

**"Blog post already exists"**
- Expected behavior - the agent will update the existing post instead of creating a new one
- Set this as a warning, not an error

**"Failed to commit changes"**
- Check git repository status
- Ensure you have permission to commit
- Verify repository is initialized

**"No taxonomy generated"**
- Check that `autoTag` or `autoCategory` options are `true`
- Verify content has sufficient keywords for categorization

**Tags not UK English**
- Check `taxonomy-service.ts` custom dictionary
- Add new UK English terms to `commonTags` array

## License

Part of Lighthouse Mentoring agent system
