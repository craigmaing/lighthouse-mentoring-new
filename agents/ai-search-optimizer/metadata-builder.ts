/**
 * Metadata Optimizer
 *
 * Generates SEO-optimized meta tags specifically tuned for AI search engines.
 * Follows ChatGPT's source evaluation criteria.
 */

import type { BlogPost, Author, MetaTags } from './types';

export class MetadataBuilder {
  private config: {
    baseUrl: string;
    organizationName: string;
  };

  constructor(config: { baseUrl: string; organizationName: string }) {
    this.config = config;
  }

  /**
   * Generate optimized meta description (150-160 characters)
   */
  generateMetaDescription(post: BlogPost, author: Author): string {
    const { description } = post;

    // If description is already optimal length, use it
    if (description.length >= 150 && description.length <= 160) {
      return description;
    }

    // If too long, trim intelligently
    if (description.length > 160) {
      return description.substring(0, 157) + '...';
    }

    // If too short, enhance with author credential
    const enhanced = `${description} By ${author.name}, ${author.credentials[0].name}.`;

    if (enhanced.length <= 160) {
      return enhanced;
    }

    return description;
  }

  /**
   * Generate SEO-optimized title (50-60 characters ideal)
   */
  generateTitle(post: BlogPost): string {
    const fullTitle = `${post.title} | ${this.config.organizationName}`;

    // Ideal length is 50-60 chars
    if (fullTitle.length <= 60) {
      return fullTitle;
    }

    // If too long, just use article title
    return post.title;
  }

  /**
   * Generate keyword meta tag (5-7 focused keywords)
   */
  generateKeywords(post: BlogPost): string {
    const keywords: string[] = [];

    // Add primary tags (up to 5)
    if (post.tags) {
      keywords.push(...post.tags.slice(0, 5));
    }

    // Add category if not already included
    if (post.categories && !keywords.includes(post.categories[0])) {
      keywords.push(post.categories[0]);
    }

    // Add author name for personal brand SEO
    keywords.push('Craig Fearn');

    return keywords.join(', ');
  }

  /**
   * Generate canonical URL
   */
  generateCanonicalUrl(post: BlogPost): string {
    return `${this.config.baseUrl}/insights/${post.slug}`;
  }

  /**
   * Generate Open Graph tags
   */
  generateOpenGraphTags(post: BlogPost, author: Author): Record<string, string> {
    return {
      'og:title': post.title,
      'og:description': this.generateMetaDescription(post, author),
      'og:type': 'article',
      'og:url': this.generateCanonicalUrl(post),
      'og:image': post.heroImage
        ? `${this.config.baseUrl}${post.heroImage}`
        : `${this.config.baseUrl}/images/og-default.jpg`,
      'og:site_name': this.config.organizationName,
      'article:published_time': post.date,
      'article:author': author.name,
      'article:section': post.categories?.[0] || 'Insights',
      'article:tag': post.tags?.join(', ') || ''
    };
  }

  /**
   * Generate Twitter Card tags
   */
  generateTwitterCardTags(post: BlogPost, author: Author): Record<string, string> {
    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': post.title,
      'twitter:description': this.generateMetaDescription(post, author),
      'twitter:image': post.heroImage
        ? `${this.config.baseUrl}${post.heroImage}`
        : `${this.config.baseUrl}/images/twitter-card-default.jpg`
    };
  }

  /**
   * Build complete meta tags object
   */
  build(post: BlogPost, author: Author): MetaTags {
    return {
      title: this.generateTitle(post),
      description: this.generateMetaDescription(post, author),
      author: author.name,
      keywords: this.generateKeywords(post),
      canonical: this.generateCanonicalUrl(post),
      openGraph: {
        title: post.title,
        description: this.generateMetaDescription(post, author),
        type: 'article',
        url: this.generateCanonicalUrl(post),
        image: post.heroImage
          ? `${this.config.baseUrl}${post.heroImage}`
          : undefined
      }
    };
  }

  /**
   * Convert to Astro frontmatter format
   */
  toAstroFrontmatter(metaTags: MetaTags): Record<string, any> {
    return {
      title: metaTags.title,
      description: metaTags.description,
      author: metaTags.author,
      keywords: metaTags.keywords,
      canonical: metaTags.canonical,
      ogTitle: metaTags.openGraph.title,
      ogDescription: metaTags.openGraph.description,
      ogType: metaTags.openGraph.type,
      ogUrl: metaTags.openGraph.url,
      ogImage: metaTags.openGraph.image
    };
  }

  /**
   * Generate HTML meta tags
   */
  toHtmlTags(metaTags: MetaTags): string {
    const ogTags = this.generateOpenGraphTags(
      {
        slug: metaTags.canonical.split('/').pop()!,
        title: metaTags.openGraph.title,
        description: metaTags.description,
        content: '',
        date: new Date().toISOString(),
        author: metaTags.author,
        heroImage: metaTags.openGraph.image
      } as BlogPost,
      { name: metaTags.author } as Author
    );

    const twitterTags = this.generateTwitterCardTags(
      {
        slug: metaTags.canonical.split('/').pop()!,
        title: metaTags.openGraph.title,
        description: metaTags.description,
        content: '',
        date: new Date().toISOString(),
        author: metaTags.author,
        heroImage: metaTags.openGraph.image
      } as BlogPost,
      { name: metaTags.author } as Author
    );

    const tags = [
      `<title>${metaTags.title}</title>`,
      `<meta name="description" content="${metaTags.description}">`,
      `<meta name="author" content="${metaTags.author}">`,
      `<meta name="keywords" content="${metaTags.keywords}">`,
      `<link rel="canonical" href="${metaTags.canonical}">`,
      ...Object.entries(ogTags).map(
        ([key, value]) => `<meta property="${key}" content="${value}">`
      ),
      ...Object.entries(twitterTags).map(
        ([key, value]) => `<meta name="${key}" content="${value}">`
      )
    ];

    return tags.join('\n');
  }
}
