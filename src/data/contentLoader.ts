import type { ProcessedPost } from '@/lib/postConversion';

// Markdown file imports
const markdownFiles = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true });

function parseMarkdownFrontMatter(content: string): { frontMatter: any; content: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { frontMatter: {}, content };
  }

  const frontMatterYaml = match[1];
  const markdownContent = match[2];
  
  // Simple YAML parser for front matter
  const frontMatter: any = {};
  frontMatterYaml.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: string | string[] = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
      }
      
      frontMatter[key] = value;
    }
  });

  return { frontMatter, content: markdownContent };
}

function createPostFromMarkdown(fileName: string, content: string): ProcessedPost {
  const { frontMatter, content: markdownContent } = parseMarkdownFrontMatter(content);
  const slug = fileName.replace('/content/', '').replace('.md', '');
  
  return {
    id: slug,
    slug,
    title: frontMatter.title || 'Untitled',
    description: frontMatter.description || '',
    category: frontMatter.category || 'Essay',
    tags: Array.isArray(frontMatter.tags) ? frontMatter.tags : [],
    date: frontMatter.date || new Date().toISOString().split('T')[0],
    authorId: frontMatter.authorId || '1',
    content: markdownContent,
    readTime: frontMatter.readTime,
    outline: frontMatter.outline,
    thumbnailUrl: frontMatter.thumbnailUrl,
    micrographics: frontMatter.micrographics
  };
}

export async function loadAllPosts(): Promise<ProcessedPost[]> {
  const posts: ProcessedPost[] = [];
  
  for (const [fileName, content] of Object.entries(markdownFiles)) {
    if (typeof content === 'string') {
      posts.push(createPostFromMarkdown(fileName, content));
    }
  }
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function loadPostBySlug(slug: string): Promise<ProcessedPost | null> {
  const fileName = `/content/${slug}.md`;
  const content = markdownFiles[fileName];
  
  if (typeof content === 'string') {
    return createPostFromMarkdown(fileName, content);
  }
  
  return null;
}

export async function loadPostsByCategory(category: string): Promise<ProcessedPost[]> {
  const allPosts = await loadAllPosts();
  return allPosts.filter(post => post.category === category);
}
