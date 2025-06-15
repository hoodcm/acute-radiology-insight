
import { Link } from 'react-router-dom';
import type { Post } from '@/data/posts';
import { LazyImage } from './LazyImage';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Using a static placeholder image for demonstration purposes.
  const imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60`;
  const placeholderUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=20&blur=10&auto=format&fit=crop&q=20`;

  return (
    <Link to={`/posts/${post.slug}`} className="block group col-span-12 md:col-span-6 lg:col-span-3">
      <div className="bg-card rounded-lg border border-transparent group-hover:border-accent transition-all duration-300 transform group-hover:scale-[1.03] overflow-hidden">
        <div className="aspect-video">
          <LazyImage
            src={imageUrl}
            placeholderSrc={placeholderUrl}
            alt={`Featured image for ${post.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-lg">
          <h3 className="font-serif text-xl font-bold text-card-foreground mb-sm">{post.title}</h3>
          <p className="text-muted-foreground text-sm mb-md line-clamp-2">{post.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-sm">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-accent-foreground bg-accent/20 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground/80">{post.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
