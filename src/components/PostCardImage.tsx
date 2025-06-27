
import { LazyImage } from './LazyImage';
import { Image } from 'lucide-react';
import type { Post } from '@/data/posts';

interface PostCardImageProps {
  post: Post;
  hasImaging: boolean;
}

export function PostCardImage({ post, hasImaging }: PostCardImageProps) {
  const imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60`;
  const placeholderUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=20&blur=10&auto=format&fit=crop&q=20`;

  return (
    <div className="aspect-[7/4] relative overflow-hidden">
      <LazyImage
        src={imageUrl}
        placeholderSrc={placeholderUrl}
        alt={`Featured image for ${post.title}`}
        className="w-full h-full object-cover transition-transform duration-300"
      />
      {hasImaging && (
        <div className="absolute top-2 left-2 bg-accent/90 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Image className="w-3 h-3" />
          Interactive Images
        </div>
      )}
    </div>
  );
}
