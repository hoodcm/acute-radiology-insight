
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

// Initialize with empty array, will be populated by loadPosts
export let posts: Post[] = [];

// Load posts and update the posts array
export async function loadPosts(): Promise<Post[]> {
  try {
    const processedPosts = await loadAllPosts();
    const convertedPosts = processedPosts.map(convertToLegacyFormat);
    
    // Update the exported posts array
    posts.length = 0;
    posts.push(...convertedPosts);
    
    return convertedPosts;
  } catch (error) {
    console.error('Error loading posts from content files:', error);
    return [];
  }
}

// Initialize posts on module load
loadPosts().catch(error => {
  console.error('Failed to initialize posts:', error);
});
