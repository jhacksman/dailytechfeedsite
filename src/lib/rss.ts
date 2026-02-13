import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { array, number, object, optional, parse, string, union } from 'valibot';

import { optimizeImage } from './optimize-episode-image';
import { dasherize } from '../utils/dasherize';
import { truncate } from '../utils/truncate';
import starpodConfig from '../../starpod.config';

/**
 * Parse a duration value which may be a number (seconds) or a string like "21:26" or "1:05:30"
 */
function parseDuration(duration: number | string): number {
  if (typeof duration === 'number') return duration;
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return Number(duration) || 0;
}

export interface Show {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Episode {
  id: string;
  title: string;
  published: number;
  description: string;
  duration: number;
  content: string;
  episodeImage?: string;
  episodeNumber?: string;
  episodeSlug: string;
  episodeThumbnail?: string;
  audio: {
    src: string;
    type: string;
  };
}

const showInfoCache: Map<string, Show> = new Map();

export async function getShowInfo(feedUrl?: string): Promise<Show> {
  const url = feedUrl ?? starpodConfig.rssFeed;
  if (showInfoCache.has(url)) {
    return showInfoCache.get(url)!;
  }

  // @ts-expect-error
  const showInfo = (await parseFeed.parse(url)) as Show;
  try {
    const optimized = await optimizeImage(showInfo.image, {
      height: 640,
      width: 640
    });
    if (optimized) showInfo.image = optimized;
  } catch {
    // Keep original image URL if optimization fails
  }

  showInfoCache.set(url, showInfo);
  return showInfo;
}

const episodesCache: Map<string, Array<Episode>> = new Map();

export async function getAllEpisodes(feedUrl?: string): Promise<Array<Episode>> {
  const url = feedUrl ?? starpodConfig.rssFeed;
  if (episodesCache.has(url)) {
    return episodesCache.get(url)!;
  }
  let FeedSchema = object({
    items: array(
      object({
        id: string(),
        title: string(),
        published: number(),
        description: string(),
        content_encoded: optional(string()),
        itunes_duration: union([number(), string()]),
        itunes_episode: optional(number()),
        itunes_episodeType: optional(string(), 'full'),
        itunes_image: optional(object({ href: optional(string()) })),
        enclosures: array(
          object({
            url: string(),
            type: string()
          })
        )
      })
    )
  });

  // @ts-expect-error
  let feed = (await parseFeed.parse(url)) as Show;
  let items = parse(FeedSchema, feed).items;

  let episodes: Array<Episode> = await Promise.all(
    items
      .filter((item) => item.itunes_episodeType !== 'trailer')
      .map(
        async ({
          description,
          content_encoded,
          id,
          title,
          enclosures,
          published,
          itunes_duration,
          itunes_episode,
          itunes_episodeType,
          itunes_image
        }) => {
          const episodeNumber =
            itunes_episodeType === 'bonus' ? 'Bonus' : itunes_episode != null ? `${itunes_episode}` : undefined;
          const episodeSlug = dasherize(title);
          const episodeContent = content_encoded || description;

          return {
            id,
            title: `${title}`,
            content: episodeContent,
            description: truncate(htmlToText(description), 260),
            duration: parseDuration(itunes_duration),
            episodeImage: itunes_image?.href,
            episodeNumber,
            episodeSlug,
            episodeThumbnail: itunes_image?.href ? await optimizeImage(itunes_image?.href).catch(() => itunes_image?.href) : undefined,
            published,
            audio: enclosures.map((enclosure) => ({
              src: enclosure.url,
              type: enclosure.type
            }))[0]
          };
        }
      )
  );

  // Sort newest first
  episodes.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

  episodesCache.set(url, episodes);
  return episodes;
}
