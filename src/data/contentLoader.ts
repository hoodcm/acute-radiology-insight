import type { ProcessedPost } from '@/lib/postConversion';

// Clean markdown content loader
// Ready for markdown file integration
export async function loadAllPosts(): Promise<ProcessedPost[]> {
  // Return empty array - ready for markdown content
  return [];
}

export async function loadPostBySlug(slug: string): Promise<ProcessedPost | null> {
  // Return null - ready for markdown content
  return null;
}

export async function loadPostsByCategory(category: string): Promise<ProcessedPost[]> {
  // Return empty array - ready for markdown content
  return [];
}
