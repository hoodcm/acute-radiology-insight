
export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  authorId: string;
  content: string;
  readTime: string;
  outline?: string;
  thumbnailUrl?: string;
  micrographics?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
  };
}

export interface ProcessedPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  authorId: string;
  content: string;
  readTime?: string;
  outline?: string;
  thumbnailUrl?: string;
  micrographics?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
  };
}

export function convertProcessedPostToPost(processedPost: ProcessedPost): Post {
  return {
    id: parseInt(processedPost.id) || 1,
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
