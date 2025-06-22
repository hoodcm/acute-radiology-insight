
import { useParams, Link } from 'react-router-dom';
import { authors } from '@/data/authors';
import { posts } from '@/data/posts';
import NotFound from './NotFound';
import { PostCard } from '@/components/PostCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function AuthorPage() {
  const { slug } = useParams();
  const author = authors.find((a) => a.slug === slug);

  if (!author) {
    return <NotFound />;
  }

  const authorPosts = posts.filter((post) => post.authorId === author.id);

  return (
    <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <Breadcrumb className="mb-4 md:mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-xs uppercase font-sans text-muted-foreground hover:text-foreground hover:underline">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs uppercase font-sans text-foreground">
              {author.name}
            </BreadcrumbPage>
          </Brea

dcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <header className="mb-8 md:mb-12 lg:mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground mb-4 md:mb-6">{author.name}</h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl text-accent mb-4 md:mb-6">{author.title}</h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">{author.bio}</p>
      </header>

      <div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6 lg:mb-8 border-b border-border pb-2 sm:pb-4">
          Posts by {author.name}
        </h3>
        {authorPosts.length > 0 ? (
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {authorPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-base sm:text-lg">No posts by this author yet.</p>
        )}
      </div>
    </div>
  );
}
