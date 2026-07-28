import type { ProjectGalleryItem } from "../types/project";

/**
 * Normalize a project's gallery field into a consistent ProjectGalleryItem array.
 * Handles: undefined, empty array, string[], ProjectGalleryItem[], and single image fallback.
 */
export function normalizeGallery(
  gallery: unknown,
  fallbackImage: string | undefined,
  projectName: string,
): ProjectGalleryItem[] {
  if (!gallery || (Array.isArray(gallery) && gallery.length === 0)) {
    return fallbackImage
      ? [{ url: fallbackImage, alt: projectName, type: "image" }]
      : [];
  }

  if (Array.isArray(gallery) && typeof gallery[0] === "string") {
    return (gallery as string[]).map(url => ({
      url,
      alt: projectName,
      type: "image" as const,
    }));
  }

  return gallery as ProjectGalleryItem[];
}
