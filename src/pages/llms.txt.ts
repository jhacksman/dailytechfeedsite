import type { APIRoute } from 'astro';

import { generateLlmsTxt } from '../lib/llms';
import { getAllEpisodes, getShowInfo } from '../lib/rss';
import { getShowConfig } from '../config/shows';
import starpodConfig from '../../starpod.config';

export const GET: APIRoute = async ({ site }) => {
  // Use DTF:HN as the primary show for llms.txt (backward compat)
  const dtfhn = getShowConfig('dtfhn')!;
  const show = await getShowInfo(dtfhn.rssFeed);
  const episodes = await getAllEpisodes(dtfhn.rssFeed);

  const recentEpisodes = episodes.slice(0, 10);

  const content = generateLlmsTxt(show, recentEpisodes, starpodConfig, site);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
