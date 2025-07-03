
import { loadAllPosts, type ProcessedPost } from './contentLoader';

export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  authorId: number;
  content: string;
  readTime: string;
  outline: string[];
  thumbnailUrl?: string;
  micrographics: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
  };
}

// Convert ProcessedPost to Post format for backward compatibility
function convertToLegacyFormat(processedPost: ProcessedPost): Post {
  return {
    id: parseInt(processedPost.id) || Math.abs(hashCode(processedPost.slug)),
    slug: processedPost.slug,
    title: processedPost.title,
    description: processedPost.description,
    category: processedPost.category,
    tags: processedPost.tags,
    date: processedPost.date,
    authorId: processedPost.authorId,
    content: processedPost.content,
    readTime: processedPost.readTime || '5 min',
    outline: processedPost.outline,
    thumbnailUrl: processedPost.thumbnailUrl,
    micrographics: processedPost.micrographics || {
      topLeft: '',
      topRight: '',
      bottomLeft: '',
    },
  };
}

// Simple hash function for generating consistent IDs
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Load posts from content files
let cachedPosts: Post[] | null = null;

export async function loadPosts(): Promise<Post[]> {
  if (!cachedPosts) {
    try {
      const processedPosts = await loadAllPosts();
      cachedPosts = processedPosts.map(convertToLegacyFormat);
    } catch (error) {
      console.error('Error loading posts from content files:', error);
      cachedPosts = [];
    }
  }
  return cachedPosts;
}

// For immediate use (will be empty initially until posts are loaded)
export let posts: Post[] = [];

// Load posts and update the posts array
loadPosts().then(loadedPosts => {
  posts.length = 0;
  posts.push(...loadedPosts);
}).catch(error => {
  console.error('Failed to load posts:', error);
});
