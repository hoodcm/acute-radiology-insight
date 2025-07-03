
import type { ProcessedPost } from '@/lib/postConversion';

// Mock data for development - in a real app this would load from a CMS or API
const mockPosts: ProcessedPost[] = [
  {
    id: '1',
    slug: 'acute-appendicitis-case',
    title: 'Acute Appendicitis: A Challenging Case',
    description: 'Complex presentation of acute appendicitis with atypical imaging findings requiring careful diagnostic consideration.',
    category: 'Case Study',
    tags: ['CT', 'Abdomen', 'Emergency', 'Appendicitis'],
    date: '2024-01-15',
    authorId: '1',
    content: '<p>This case presents a challenging diagnosis of acute appendicitis with atypical imaging findings...</p>',
    readTime: '8 min',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    slug: 'ai-in-stroke-imaging',
    title: 'AI in Stroke Imaging: Current Applications',
    description: 'Exploring the current state and future potential of artificial intelligence in acute stroke imaging protocols.',
    category: 'Essay',
    tags: ['AI', 'Stroke', 'CT', 'MRI', 'Technology'],
    date: '2024-01-10',
    authorId: '2',
    content: '<p>Artificial intelligence is revolutionizing stroke imaging with faster detection and improved outcomes...</p>',
    readTime: '12 min',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    slug: 'ct-protocol-optimization',
    title: 'CT Protocol Optimization Strategies',
    description: 'Comprehensive guide to optimizing CT protocols for enhanced diagnostic accuracy while minimizing radiation exposure.',
    category: 'Tool',
    tags: ['CT', 'Protocol', 'Optimization', 'Radiation Safety'],
    date: '2024-01-05',
    authorId: '1',
    content: '<p>Effective CT protocol optimization requires balancing image quality with radiation dose considerations...</p>',
    readTime: '15 min',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-5f5048c9f5b4?w=400&auto=format&fit=crop&q=60'
  }
];

export async function loadAllPosts(): Promise<ProcessedPost[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPosts;
}

export async function loadPostBySlug(slug: string): Promise<ProcessedPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPosts.find(post => post.slug === slug) || null;
}

export async function loadPostsByCategory(category: string): Promise<ProcessedPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPosts.filter(post => post.category === category);
}
