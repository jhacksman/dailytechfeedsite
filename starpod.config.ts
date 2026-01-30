import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb:
    'AI-curated top tech stories from Hacker News, delivered daily as a podcast.',
  description:
    'Daily Tech Feed is an AI-generated podcast that curates the top stories from Hacker News each day. Every episode delivers concise, engaging summaries of the most important developments in technology, programming, startups, and science — so you can stay informed without doomscrolling.',
  hosts: [],
  platforms: {
    apple: '',
    appleIdNumber: '',
    overcast: '',
    pocketCasts: '',
    spotify: '',
    youtube: ''
  },
  rssFeed: 'https://podcast.pdxh.org/dtfhn/feed.xml'
});
