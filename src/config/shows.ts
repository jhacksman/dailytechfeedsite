export interface ShowConfig {
  id: string;
  title: string;
  blurb: string;
  description: string;
  rssFeed: string;
  basePath: string;
  platforms: {
    spotify?: string;
    apple?: string;
    appleIdNumber?: string;
    amazon?: string;
    overcast?: string;
    pocketCasts?: string;
    youtube?: string;
    podcastIndex?: string;
    rss?: string;
  };
}

export const shows: ShowConfig[] = [
  {
    id: 'dtfhn',
    title: 'Daily Tech Feed: Hacker News',
    blurb: 'AI-generated daily podcast covering the top 10 Hacker News stories',
    description:
      'Daily Tech Feed is an AI-generated podcast that curates the top stories from Hacker News each day. Every episode delivers concise, engaging summaries of the most important developments in technology, programming, startups, and science — so you can stay informed without doomscrolling.',
    rssFeed: 'https://podcast.pdxh.org/dtfhn/feed.xml',
    basePath: '/dtfhn',
    platforms: {
      spotify: 'https://open.spotify.com/show/0JnwyMvqXZQ32B9KbS37Qq',
      apple: 'https://podcasts.apple.com/us/podcast/daily-tech-feed-hacker-news/id1873195460',
      appleIdNumber: '1873195460',
      amazon: 'https://music.amazon.com/podcasts/d7a8e88e-692a-4bcc-ae0b-ff5520150abe/daily-tech-feed-hacker-news',
      podcastIndex: 'https://podcastindex.org/podcast/7678743',
      rss: 'https://podcast.pdxh.org/dtfhn/feed.xml',
    },
  },
  {
    id: 'dtfftl',
    title: 'Daily Tech Feed: From the Labs',
    blurb: 'Deep dives into foundational AI and ML research papers',
    description:
      'Daily Tech Feed: From the Labs delivers deep dives into the most important AI and machine learning research papers. Each episode breaks down a single paper — the core ideas, the technical details, and the researchers behind the work. Dispatches from the edge.',
    rssFeed: 'https://podcast.pdxh.org/dtfftl/feed.xml',
    basePath: '/dtfftl',
    platforms: {
      spotify: 'https://open.spotify.com/show/7wb7q9pM4yxIPidH1JQoss',
      rss: 'https://podcast.pdxh.org/dtfftl/feed.xml',
    },
  },
  {
    id: 'dtfravingfinch',
    title: 'Daily Tech Feed: Raving Finch',
    blurb: "Portland's daily weather report, delivered in the contemplative style of David Lynch",
    description:
      "Every morning, a contemplative look at Portland's weather. Long pauses. Rain. Gray skies. There's a beauty in it.",
    rssFeed: 'https://podcast.pdxh.org/dtfravingfinch/feed.xml?v=20260203',
    basePath: '/dtfravingfinch',
    platforms: {
      spotify: 'https://open.spotify.com/show/5RIVfNSUQGsTVTPb2aKvOX',
      apple: 'https://podcasts.apple.com/us/podcast/dtf-raving-finch/id1873718884',
      appleIdNumber: '1873718884',
      amazon: 'https://music.amazon.com/podcasts/b6f40c3d-15b7-4be3-8ee4-08334222ec49/dtf-raving-finch',
      podcastIndex: 'https://podcastindex.org/podcast/7681688',
      rss: 'https://podcast.pdxh.org/dtfravingfinch/feed.xml',
    },
  },
];

// NOTE: rssFeed URLs have cache-bust params because Cloudflare caches for 7 days.
// When feed issues arise, increment the ?v= param.

export function getShowConfig(id: string): ShowConfig | undefined {
  return shows.find((s) => s.id === id);
}
