export async function optimizeImage(
  image?: string,
  _options?: { height?: number; width?: number }
) {
  // Skip Astro image optimization for remote images to avoid build failures
  // when remote URLs return non-200 responses
  return image;
}
