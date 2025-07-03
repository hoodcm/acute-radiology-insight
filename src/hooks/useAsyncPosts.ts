
import { useState, useEffect } from 'react';
import { loadAllPosts, loadPostsByCategory, loadPostBySlug } from '@/data/contentLoader';
import type { ProcessedPost } from '@/lib/content';

export function useAllPosts() {
  const [posts, setPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const loadedPosts = await loadAllPosts();
        setPosts(loadedPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function usePostsByCategory(category: string) {
  const [posts, setPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const loadedPosts = await loadPostsByCategory(category);
        setPosts(loadedPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [category]);

  return { posts, loading, error };
}

export function usePost(slug: string) {
  const [post, setPost] = useState<ProcessedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const loadedPost = await loadPostBySlug(slug);
        setPost(loadedPost);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}
