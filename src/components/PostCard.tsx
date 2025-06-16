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
      <div className="bg-card rounded-lg shadow-lg dark:shadow-[0_4px_24px_rgba(31,41,55,0.6)] border border-transparent transform transition-transform duration-150 ease-out hover:scale-[1.02] hover:-translate-y-[2px] group-hover:border-accent overflow-hidden flex flex-col justify-between">
        <div className="aspect-[7/4]">
          <LazyImage
            src={imageUrl}
            placeholderSrc={placeholderUrl}
            alt={`Featured image for ${post.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col flex-1">
          <h3 className="font-jersey25 text-2xl md:text-3xl leading-tight tracking-tight font-semibold text-foreground mb-2">{post.title}</h3>
          <p className="font-jersey25 text-base md:text-lg leading-snug tracking-tight text-muted-foreground mb-4 line-clamp-2">{post.description}</p>
          <div className="mt-4 flex flex-col items-start gap-2">
            <div className="flex gap-2">
              {post.tags
                .filter((tag) => tag.toLowerCase() !== "error analysis")
                .map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center uppercase text-[0.65rem] font-semibold tracking-tight text-accent-foreground bg-accent/10 px-1.5 py-0.5 rounded dark:bg-accent/30 dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <span className="text-xs leading-tight text-muted-foreground">{post.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
