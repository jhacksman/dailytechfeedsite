import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb:
    'AI-curated top tech stories from Hacker News, delivered daily as a podcast.',
  description:
    'Daily Tech Feed is an AI-generated podcast that curates the top stories from Hacker News each day. Every episode delivers concise, engaging summaries of the most important developments in technology, programming, startups, and science — so you can stay informed without doomscrolling.',
  hosts: [],
  platforms: {
    amazon: 'https://music.amazon.com/podcasts/d7a8e88e-692a-4bcc-ae0b-ff5520150abe/daily-tech-feed-hacker-news',
    apple: '',
    appleIdNumber: '',
    overcast: '',
    pocketCasts: '',
    spotify: 'https://open.spotify.com/show/0JnwyMvqXZQ32B9KbS37Qq',
    youtube: ''
  },
  rssFeed: 'https://podcast.pdxh.org/dtfhn/feed.xml'
});
