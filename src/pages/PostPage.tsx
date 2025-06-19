
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { posts } from '@/data/posts';
import NotFound from './NotFound';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { authors } from '@/data/authors';
import { Seo } from '@/components/Seo';
import { ImagingSection } from '@/components/ImagingSection';

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

  // Check if post has imaging content
  const hasImaging = post.tags.some(tag => 
    ['CT', 'MRI', 'X-Ray', 'Ultrasound', 'Nuclear Medicine'].some(modality => 
      tag.toLowerCase().includes(modality.toLowerCase())
    )
  );

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
        <div className="grid lg:grid-cols-4 space-fluid-lg lg:gap-2xl">
          <main className="lg:col-span-3" role="main">
            <Breadcrumbs postTitle={post.title} postCategory={post.category} />
            
            <header className="mb-xl">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-md">
                {post.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-fluid-sm">
                {author ? (
                  <p className="text-gray-400">
                    By{' '}
                    <Link 
                      to={`/authors/${author.slug}`} 
                      className="hover:text-white transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                    >
                      {author.name}
                    </Link>{' '}
                    on <time dateTime={post.date}>{post.date}</time>
                  </p>
                ) : (
                  <p className="text-gray-400">
                    On <time dateTime={post.date}>{post.date}</time>
                  </p>
                )}
                
                <div className="flex gap-2 mt-2 sm:mt-0">
                  {post.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium text-[var(--color-accent)] bg-[#2a2116] px-2 py-1 rounded-full"
                      role="tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>
            
            <article 
              className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:font-serif prose-headings:text-white prose-a:text-[var(--color-accent)] hover:prose-a:text-white prose-a:focus-visible:ring-2 prose-a:focus-visible:ring-accent prose-a:focus-visible:ring-offset-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
              role="article"
              aria-labelledby="article-title"
            />

            {/* Imaging Section */}
            {hasImaging && (
              <ImagingSection
                postType={post.category as 'Case Study' | 'Essay' | 'Hindsight'}
                postSlug={post.slug}
                title={post.title}
                hasInteractiveImages={true}
              />
            )}
          </main>
          
          <aside 
            className="lg:col-span-1 lg:border-l lg:border-[var(--color-border)] lg:pl-xl"
            role="complementary"
            aria-label="Article sidebar"
          >
            <section aria-labelledby="tags-heading">
              <h3 id="tags-heading" className="font-serif text-2xl font-bold text-white mb-md">
                Tags
              </h3>
              <div className="flex flex-wrap space-fluid-sm mb-xl" role="list">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs font-medium text-[var(--color-accent)] bg-[#2a2116] px-2 py-1 rounded-full"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
            
            <section aria-labelledby="related-heading">
              <h3 id="related-heading" className="font-serif text-2xl font-bold text-white mb-md">
                Related Posts
              </h3>
              <nav className="space-y-md" aria-label="Related articles">
                {relatedPosts.map(related => (
                  <Link 
                    to={`/posts/${related.slug}`} 
                    key={related.id} 
                    className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded p-2 -m-2"
                  >
                    <h4 className="font-serif font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      <time dateTime={related.date}>{related.date}</time>
                    </p>
                  </Link>
                ))}
                
                {relatedPosts.length === 0 && (
                  <p className="text-sm text-gray-500">No related posts found.</p>
                )}
              </nav>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
