
import { getAllPosts, getPostsByCategory, getPostBySlug, type ProcessedPost } from '@/lib/content';

// Cache for processed posts to avoid repeated file system operations
let postsCache: ProcessedPost[] | null = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function loadAllPosts(): Promise<ProcessedPost[]> {
  const now = Date.now();
  
  // Use cache if available and not expired
  if (postsCache && (now - lastCacheUpdate) < CACHE_DURATION) {
    return postsCache;
  }
  
  try {
    postsCache = await getAllPosts();
    lastCacheUpdate = now;
    return postsCache;
  } catch (error) {
    console.error('Error loading posts:', error);
    // Return empty array if content loading fails
    return [];
  }
}

export async function loadPostsByCategory(category: string): Promise<ProcessedPost[]> {
  try {
    return await getPostsByCategory(category);
  } catch (error) {
    console.error(`Error loading posts for category ${category}:`, error);
    return [];
  }
}

export async function loadPostBySlug(slug: string): Promise<ProcessedPost | null> {
  try {
    return await getPostBySlug(slug);
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

// Clear cache (useful for development)
export function clearPostsCache(): void {
  postsCache = null;
  lastCacheUpdate = 0;
}
