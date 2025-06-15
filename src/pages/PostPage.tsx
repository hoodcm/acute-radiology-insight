
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { posts } from '@/data/posts';
import NotFound from './NotFound';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { authors } from '@/data/authors';
import { Seo } from '@/components/Seo';

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const author = authors.find((a) => a.id === post.authorId);
  const relatedPosts = posts.filter(p => p.id !== post.id).slice(0, 2);

  const postUrl = `${window.location.origin}/posts/${post.slug}`;
  const imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60`;
  const publishedDate = format(new Date(post.date), 'yyyy-MM-dd');

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: post.title,
    description: post.description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: author?.name || 'Level One Radiology',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Level One Radiology',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lovable.dev/opengraph-image-p98pqg.png',
      },
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
  };

  return (
    <>
      <Seo title={post.title} description={post.description} jsonLd={jsonLdData} />
      <div className="container mx-auto py-12 lg:py-16">
        <div className="grid lg:grid-cols-4 gap-lg lg:gap-2xl">
          <div className="lg:col-span-3">
            <Breadcrumbs postTitle={post.title} postCategory={post.category} />
            <header className="mb-xl">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-md">{post.title}</h1>
              {author ? (
                <p className="text-gray-400">
                  By{' '}
                  <Link to={`/authors/${author.slug}`} className="hover:text-white transition-colors hover:underline">
                    {author.name}
                  </Link>{' '}
                  on {post.date}
                </p>
              ) : (
                <p className="text-gray-400">On {post.date}</p>
              )}
            </header>
            <div 
              className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:font-serif prose-headings:text-white prose-a:text-[var(--color-accent)] hover:prose-a:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <aside className="lg:col-span-1 lg:border-l lg:border-[var(--color-border)] lg:pl-xl">
              <h3 className="font-serif text-2xl font-bold text-white mb-md">Tags</h3>
              <div className="flex flex-wrap gap-sm mb-xl">
                  {post.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-[var(--color-accent)] bg-[#2a2116] px-2 py-1 rounded-full">{tag}</span>
                  ))}
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-md">Related Posts</h3>
              <div className="space-y-md">
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
    </>
  );
}
