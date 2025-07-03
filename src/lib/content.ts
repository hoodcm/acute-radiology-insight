
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface PostFrontMatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  authorId: number;
  readTime?: string;
  thumbnailUrl?: string;
  micrographics?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
  };
}

export interface ProcessedPost extends PostFrontMatter {
  id: string;
  slug: string;
  content: string;
  outline: string[];
}

const contentDirectory = path.join(process.cwd(), 'content');

// Configure remark processor
const processor = remark()
  .use(remarkGfm)
  .use(remarkHtml, { sanitize: false });

export async function getPostBySlug(slug: string): Promise<ProcessedPost | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await processor.process(content);
    const htmlContent = processedContent.toString();
    
    // Generate outline from content (extract h2 and h3 headers)
    const outline = extractOutline(content);
    
    return {
      id: slug,
      slug,
      content: htmlContent,
      outline,
      ...(data as PostFrontMatter)
    };
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<ProcessedPost[]> {
  try {
    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true });
      return [];
    }

    const fileNames = fs.readdirSync(contentDirectory)
      .filter(name => name.endsWith('.md'));
    
    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return await getPostBySlug(slug);
      })
    );
    
    return posts
      .filter((post): post is ProcessedPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<ProcessedPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
}

function extractOutline(content: string): string[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const outline: string[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    outline.push(match[2]);
  }
  
  return outline;
}

// Utility function to generate post ID from slug
export function generatePostId(slug: string): number {
  // Simple hash function to generate consistent numeric IDs
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
