
export interface ContentChunk {
  id: string;
  postId: number;
  type: 'title' | 'description' | 'section' | 'paragraph';
  content: string;
  metadata: {
    sectionTitle?: string;
    order: number;
    wordCount: number;
  };
}

export interface SearchableContent {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  authorId: number;
  readTime: string;
  chunks: ContentChunk[];
}

/**
 * Chunks content into discrete, meaningful blocks for RAG compatibility
 */
export class ContentChunker {
  private static readonly MAX_CHUNK_SIZE = 500; // words
  private static readonly OVERLAP_SIZE = 50; // words

  static chunkPost(post: any): SearchableContent {
    const chunks: ContentChunk[] = [];
    let chunkOrder = 0;

    // Title chunk
    chunks.push({
      id: `${post.id}-title`,
      postId: post.id,
      type: 'title',
      content: post.title,
      metadata: {
        order: chunkOrder++,
        wordCount: this.countWords(post.title),
      },
    });

    // Description chunk
    chunks.push({
      id: `${post.id}-description`,
      postId: post.id,
      type: 'description',
      content: post.description,
      metadata: {
        order: chunkOrder++,
        wordCount: this.countWords(post.description),
      },
    });

    // Content chunks (if content exists)
    if (post.content) {
      const contentChunks = this.chunkHtmlContent(post.content, post.id, chunkOrder);
      chunks.push(...contentChunks);
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      tags: post.tags,
      date: post.date,
      authorId: post.authorId,
      readTime: post.readTime,
      chunks,
    };
  }

  private static chunkHtmlContent(htmlContent: string, postId: number, startOrder: number): ContentChunk[] {
    // Convert HTML to plain text and split into sections
    const textContent = this.htmlToText(htmlContent);
    const sections = this.splitIntoSections(textContent);
    const chunks: ContentChunk[] = [];
    let chunkOrder = startOrder;

    sections.forEach((section, sectionIndex) => {
      const sectionChunks = this.chunkLongText(
        section.content,
        postId,
        chunkOrder,
        section.title
      );
      chunks.push(...sectionChunks);
      chunkOrder += sectionChunks.length;
    });

    return chunks;
  }

  private static htmlToText(html: string): string {
    // Simple HTML to text conversion
    return html
      .replace(/<h[1-6][^>]*>/gi, '\n### ')
      .replace(/<\/h[1-6]>/gi, '\n')
      .replace(/<p[^>]*>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private static splitIntoSections(text: string): Array<{ title?: string; content: string }> {
    const sections = text.split(/\n### /).filter(Boolean);
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(Boolean);
      if (lines.length > 1 && index > 0) {
        return {
          title: lines[0].trim(),
          content: lines.slice(1).join(' ').trim(),
        };
      }
      return {
        content: section.trim(),
      };
    });
  }

  private static chunkLongText(
    text: string,
    postId: number,
    startOrder: number,
    sectionTitle?: string
  ): ContentChunk[] {
    const words = text.split(/\s+/).filter(Boolean);
    const chunks: ContentChunk[] = [];
    let chunkOrder = startOrder;

    if (words.length <= this.MAX_CHUNK_SIZE) {
      chunks.push({
        id: `${postId}-chunk-${chunkOrder}`,
        postId,
        type: sectionTitle ? 'section' : 'paragraph',
        content: text,
        metadata: {
          sectionTitle,
          order: chunkOrder,
          wordCount: words.length,
        },
      });
    } else {
      for (let i = 0; i < words.length; i += this.MAX_CHUNK_SIZE - this.OVERLAP_SIZE) {
        const chunkWords = words.slice(i, i + this.MAX_CHUNK_SIZE);
        const chunkText = chunkWords.join(' ');

        chunks.push({
          id: `${postId}-chunk-${chunkOrder}`,
          postId,
          type: sectionTitle ? 'section' : 'paragraph',
          content: chunkText,
          metadata: {
            sectionTitle,
            order: chunkOrder,
            wordCount: chunkWords.length,
          },
        });
        chunkOrder++;
      }
    }

    return chunks;
  }

  private static countWords(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
  }
}
