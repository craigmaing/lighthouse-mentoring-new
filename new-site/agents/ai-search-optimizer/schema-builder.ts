/**
 * Schema.org Markup Generator
 *
 * Generates structured data (JSON-LD) that AI systems use to understand
 * authorship, expertise, and content credibility.
 */

import type { BlogPost, Author, SchemaMarkup, Credential } from './types';

export class SchemaBuilder {
  private config: {
    baseUrl: string;
    organizationName: string;
    organizationUrl: string;
    organizationLogo: string;
  };

  constructor(config: {
    baseUrl: string;
    organizationName: string;
    organizationUrl: string;
    organizationLogo: string;
  }) {
    this.config = config;
  }

  /**
   * Generate complete Schema.org markup for a blog post
   */
  generateArticleSchema(post: BlogPost, author: Author): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      image: post.heroImage ? `${this.config.baseUrl}${post.heroImage}` : undefined,
      datePublished: post.date,
      dateModified: post.date,
      author: this.generatePersonSchema(author),
      publisher: this.generateOrganizationSchema(),
      keywords: post.tags?.join(', '),
      articleSection: post.categories?.[0],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.config.baseUrl}/insights/${post.slug}`
      }
    };
  }

  /**
   * Generate Person schema for author (Craig Fearn)
   */
  generatePersonSchema(author: Author): object {
    return {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      description: author.bio,
      url: author.url,
      sameAs: author.sameAs,
      hasCredential: author.credentials.map(cred => this.generateCredentialSchema(cred)),
      worksFor: {
        '@type': 'Organization',
        name: this.config.organizationName,
        url: this.config.organizationUrl
      }
    };
  }

  /**
   * Generate Credential schema (Fellowships, Ambassadorships)
   */
  private generateCredentialSchema(credential: Credential): object {
    const schema: any = {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: credential.type,
      name: credential.name
    };

    if (credential.issuer) {
      schema.recognizedBy = {
        '@type': 'Organization',
        name: credential.issuer
      };
    }

    return schema;
  }

  /**
   * Generate Organization schema (Lighthouse Mentoring)
   */
  generateOrganizationSchema(): object {
    return {
      '@type': 'Organization',
      name: this.config.organizationName,
      url: this.config.organizationUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${this.config.baseUrl}${this.config.organizationLogo}`
      }
    };
  }

  /**
   * Generate complete schema markup for blog post
   */
  build(post: BlogPost, author: Author): SchemaMarkup {
    return {
      article: this.generateArticleSchema(post, author),
      person: this.generatePersonSchema(author),
      organization: this.generateOrganizationSchema()
    };
  }

  /**
   * Convert schema to JSON-LD script tag
   */
  toScriptTag(schema: object): string {
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

  /**
   * Generate all schema markup as script tags
   */
  generateAllScriptTags(post: BlogPost, author: Author): string {
    const schemas = this.build(post, author);

    return [
      this.toScriptTag(schemas.article),
      // Person and Organization schemas are included in Article schema
      // Only add separately if needed for standalone Person/Org pages
    ].join('\n');
  }
}

/**
 * Default Craig Fearn author data
 */
export const CRAIG_FEARN_AUTHOR: Author = {
  name: 'Craig Fearn',
  jobTitle: 'Board Advisory & Wellbeing Consultant',
  credentials: [
    {
      type: 'Fellowship',
      name: 'FRSPH Fellow',
      issuer: 'Royal Society for Public Health',
      category: 'Fellowship'
    },
    {
      type: 'Fellowship',
      name: 'FCMI Fellow',
      issuer: 'Chartered Management Institute',
      category: 'Fellowship'
    },
    {
      type: 'Ambassadorship',
      name: 'IoD Ambassador',
      issuer: 'Institute of Directors South West',
      category: 'Ambassadorship'
    }
  ],
  bio: 'Craig Fearn is a board-level consultant specializing in organizational wellbeing, executive coaching, and strategic advisory. With two fellowships (FRSPH, FCMI) and serving as IoD Ambassador, he works with C-suite leaders to transform workplace culture and performance.',
  url: 'https://lighthouse-mentoring.com/about',
  sameAs: [
    'https://www.linkedin.com/in/craigfearn/',
    // Add other verified profiles
  ]
};
