import type { ProcessedPost } from './content';

// Legacy Post type for backward compatibility with components
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

// Utility function to convert ProcessedPost to legacy Post format
export function convertProcessedPostToPost(processedPost: ProcessedPost): Post {
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