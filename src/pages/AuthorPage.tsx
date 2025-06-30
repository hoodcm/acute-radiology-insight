
import { useParams, Navigate } from 'react-router-dom';
import { authors } from '@/data/authors';
import { posts } from '@/data/posts';
import { PostCard } from '@/components/PostCard';
import { Seo } from '@/components/Seo';
import { AuthorBreadcrumbs } from '@/components/AuthorBreadcrumbs';

const AuthorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  const author = authors.find(a => a.slug === slug);
  
  if (!author) {
    return <Navigate to="/404" replace />;
  }

  const authorPosts = posts.filter(post => post.authorId === author.id);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Authors', href: '/authors' },
    { label: author.name }
  ];

  return (
    <>
      <Seo
        title={`${author.name} - Level One Radiology`}
        description={author.bio}
      />
      <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <AuthorBreadcrumbs items={breadcrumbItems} />
        
        <div className="mt-6 lg:mt-8">
          <div className="flex flex-col sm:flex-row gap-6 mb-8 lg:mb-12">
            <div className="flex-shrink-0">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-border"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-text-primary">{author.name}</h1>
              <p className="text-text-secondary text-base sm:text-lg mb-4">{author.bio}</p>
              <p className="text-sm text-text-secondary">{author.credentials}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-text-primary">Articles by {author.name}</h2>
            {authorPosts.length === 0 ? (
              <p className="text-text-secondary">No articles found for this author.</p>
            ) : (
              <div className="grid grid-cols-12 gap-6 lg:gap-8">
                {authorPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthorPage;
