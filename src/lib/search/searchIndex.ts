import Fuse from 'fuse.js';
import { posts, type Post } from '@/data/posts';
import { ContentChunker, type SearchableContent, type ContentChunk } from './contentChunker';

export interface SearchResult {
  post: SearchableContent;
  chunk?: ContentChunk;
  score: number;
  highlights: string[];
}

export interface SearchOptions {
  category?: string;
  tags?: string[];
  limit?: number;
  includeContent?: boolean;
}

/**
 * Modular search index that can be easily replaced with backend solutions
 */
export class SearchIndex {
  private postIndex: Fuse<SearchableContent>;
  private chunkIndex: Fuse<ContentChunk>;
  private searchableContent: SearchableContent[];

  constructor() {
    this.searchableContent = this.buildSearchableContent();
    this.postIndex = this.createPostIndex();
    this.chunkIndex = this.createChunkIndex();
  }

  private buildSearchableContent(): SearchableContent[] {
    return posts.map(post => ContentChunker.chunkPost(post));
  }

  private createPostIndex(): Fuse<SearchableContent> {
    const options: Fuse.IFuseOptions<SearchableContent> = {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'description', weight: 2 },
        { name: 'category', weight: 1.5 },
        { name: 'tags', weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
    };

    return new Fuse(this.searchableContent, options);
  }

  private createChunkIndex(): Fuse<ContentChunk> {
    const allChunks = this.searchableContent.flatMap(post => post.chunks);
    
    const options: Fuse.IFuseOptions<ContentChunk> = {
      keys: [
        { name: 'content', weight: 2 },
        { name: 'metadata.sectionTitle', weight: 1.5 },
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
    };

    return new Fuse(allChunks, options);
  }

  search(query: string, options: SearchOptions = {}): SearchResult[] {
    if (!query.trim()) return [];

    const { category, tags, limit = 10, includeContent = false } = options;
    let results: SearchResult[] = [];

    // Search posts first
    const postResults = this.postIndex.search(query).map(result => ({
      post: result.item,
      score: result.score || 0,
      highlights: this.extractHighlights(result.matches || []),
    }));

    // Search content chunks if requested
    if (includeContent) {
      const chunkResults = this.chunkIndex.search(query).map(result => {
        const post = this.searchableContent.find(p => p.id === result.item.postId)!;
        return {
          post,
          chunk: result.item,
          score: result.score || 0,
          highlights: this.extractHighlights(result.matches || []),
        };
      });

      // Merge and deduplicate results
      results = this.mergeResults(postResults, chunkResults);
    } else {
      results = postResults;
    }

    // Apply filters
    if (category) {
      results = results.filter(r => r.post.category === category);
    }

    if (tags && tags.length > 0) {
      results = results.filter(r => 
        tags.some(tag => r.post.tags.includes(tag))
      );
    }

    // Sort by relevance and limit
    return results
      .sort((a, b) => a.score - b.score)
      .slice(0, limit);
  }

  private extractHighlights(matches: readonly Fuse.FuseResultMatch[]): string[] {
    return matches.flatMap(match => 
      match.indices.map(([start, end]) => 
        match.value?.substring(start, end + 1) || ''
      )
    ).filter(Boolean);
  }

  private mergeResults(postResults: SearchResult[], chunkResults: SearchResult[]): SearchResult[] {
    const resultMap = new Map<number, SearchResult>();

    // Add post results
    postResults.forEach(result => {
      resultMap.set(result.post.id, result);
    });

    // Merge chunk results, keeping best score per post
    chunkResults.forEach(result => {
      const existing = resultMap.get(result.post.id);
      if (!existing || result.score < existing.score) {
        resultMap.set(result.post.id, result);
      }
    });

    return Array.from(resultMap.values());
  }

  getCategories(): string[] {
    return [...new Set(this.searchableContent.map(post => post.category))];
  }

  getAllTags(): string[] {
    return [...new Set(this.searchableContent.flatMap(post => post.tags))];
  }

  // Export methods for RAG compatibility
  exportChunks(): ContentChunk[] {
    return this.searchableContent.flatMap(post => post.chunks);
  }

  exportForRAG(): Array<{ content: string; metadata: any }> {
    return this.exportChunks().map(chunk => ({
      content: chunk.content,
      metadata: {
        postId: chunk.postId,
        type: chunk.type,
        order: chunk.metadata.order,
        sectionTitle: chunk.metadata.sectionTitle,
        wordCount: chunk.metadata.wordCount,
      },
    }));
  }
}

// Singleton instance
export const searchIndex = new SearchIndex();
