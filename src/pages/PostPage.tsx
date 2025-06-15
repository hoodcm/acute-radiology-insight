
import { useParams, Link } from 'react-router-dom';
import { posts } from '@/data/posts';
import NotFound from './NotFound';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = posts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="container mx-auto py-12 lg:py-16">
      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          <Breadcrumbs postTitle={post.title} />
          <header className="mb-8">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-gray-400">By {post.author} on {post.date}</p>
          </header>
          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:font-serif prose-headings:text-white prose-a:text-[var(--color-accent)] hover:prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <aside className="lg:col-span-1 lg:border-l lg:border-[var(--color-border)] lg:pl-8">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-[var(--color-accent)] bg-[#2a2116] px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">Related Posts</h3>
            <div className="space-y-4">
                {relatedPosts.map(related => (
                    <Link to={`/posts/${related.slug}`} key={related.id} className="block group">
                        <h4 className="font-serif font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">{related.title}</h4>
                        <p className="text-sm text-gray-500">{related.date}</p>
                    </Link>
                ))}
            </div>
        </aside>
      </div>
    </div>
  );
}
