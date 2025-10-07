import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const insights = await getCollection('insights');
  const sortedInsights = insights.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Lighthouse Mentoring | Insights',
    description: 'Expert insights on board advisory, executive coaching, and organizational wellbeing from Craig Fearn, FCMI Fellow and FRSPH Fellow.',
    site: context.site || 'https://lighthousementoring.co.uk',
    items: sortedInsights.map((insight) => ({
      title: insight.data.title,
      description: insight.data.description,
      pubDate: insight.data.pubDate,
      link: `/insights/${insight.slug}/`,
      author: insight.data.author,
      categories: insight.data.tags || [],
    })),
    customData: `<language>en-gb</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
