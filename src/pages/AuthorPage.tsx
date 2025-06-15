
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
    <div className="container mx-auto py-xl">
      <Breadcrumb className="mb-md">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-xs uppercase font-sans text-gray-400 hover:text-white hover:underline">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs uppercase font-sans text-white">
              {author.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <header className="mb-xl text-center">
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-md">{author.name}</h1>
        <h2 className="text-xl text-accent mb-md">{author.title}</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">{author.bio}</p>
      </header>

      <div>
        <h3 className="font-serif text-3xl font-bold text-white mb-lg border-b border-border pb-sm">
          Posts by {author.name}
        </h3>
        {authorPosts.length > 0 ? (
          <div className="grid grid-cols-12 gap-md md:gap-lg">
            {authorPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts by this author yet.</p>
        )}
      </div>
    </div>
  );
}
