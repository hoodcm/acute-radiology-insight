
import { useState, useEffect } from 'react';
import { loadAllPosts, loadPostBySlug, loadPostsByCategory } from '@/data/contentLoader';
import type { ProcessedPost } from '@/lib/postConversion';

export function useAllPosts() {
  const [posts, setPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const allPosts = await loadAllPosts();
        setPosts(allPosts);
        setError(null);
      } catch (err) {
        setError('Failed to load posts');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function usePost(slug: string) {
  const [post, setPost] = useState<ProcessedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const foundPost = await loadPostBySlug(slug);
        setPost(foundPost);
        setError(null);
      } catch (err) {
        setError('Failed to load post');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}

export function usePostsByCategory(category: string) {
  const [posts, setPosts] = useState<ProcessedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const categoryPosts = await loadPostsByCategory(category);
        setPosts(categoryPosts);
        setError(null);
      } catch (err) {
        setError(`Failed to load ${category} posts`);
        console.error(`Error loading ${category} posts:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [category]);

  return { posts, loading, error };
}
