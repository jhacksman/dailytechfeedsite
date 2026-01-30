import type { APIRoute } from 'astro';

import { generateEpisodeMarkdown } from '../lib/llms';
import { getAllEpisodes, getShowInfo } from '../lib/rss';
import starpodConfig from '../../starpod.config';

export async function getStaticPaths() {
  const allEpisodes = await getAllEpisodes();

  return allEpisodes.flatMap((episode) => {
    const paths = [
      {
        params: { episode: episode.episodeSlug },
        props: { episode }
      }
    ];
    if (episode.episodeNumber) {
      paths.push({
        params: { episode: episode.episodeNumber },
        props: { episode }
      });
    }
    return paths;
  });
}

export const GET: APIRoute = async ({ props }) => {
  const { episode } = props;
  const show = await getShowInfo();

  const markdown = generateEpisodeMarkdown(
    episode,
    show,
    starpodConfig,
    ''
  );

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
