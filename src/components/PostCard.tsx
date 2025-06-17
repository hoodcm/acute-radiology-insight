import previewEyeIcon from '@/assets/preview-eye.png';
import { Link } from 'react-router-dom';
import type { Post } from '@/data/posts';
import { LazyImage } from './LazyImage';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Using a static placeholder image for demonstration purposes.
  const imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60`;
  const placeholderUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=20&blur=10&auto=format&fit=crop&q=20`;

  const [activePreviewSlug, setActivePreviewSlug] = useState<string | null>(null);
  const previewOpen = activePreviewSlug === post.slug;

  return (
    <div className="group col-span-12 md:col-span-6 lg:col-span-3" onClick={() => previewOpen && setActivePreviewSlug(null)}>
      <div className="bg-card dark:bg-[#1E0F13] rounded-lg shadow-[6px_6px_0px_rgb(0,0,0)] dark:shadow-[6px_6px_0px_rgba(150,60,75,1)] border-[2.5px] border-black dark:border-[#963C4B] overflow-hidden relative flex flex-col justify-between h-full" onClick={(e) => e.stopPropagation()}>
        <Link to={`/posts/${post.slug}`} className="flex-1 flex flex-col justify-between h-full">
          <div className="aspect-[7/4] relative">
            <LazyImage
              src={imageUrl}
              placeholderSrc={placeholderUrl}
              alt={`Featured image for ${post.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 md:p-5 flex flex-col flex-1">
            <h3 className="font-jersey25 text-2xl md:text-3xl leading-tight tracking-tight font-semibold text-foreground mb-2">{post.title}</h3>
            <p className="font-inter-tight text-base md:text-lg leading-snug tracking-tight text-muted-foreground mb-4 line-clamp-2">{post.description}</p>
            <div className="mt-4 flex flex-col items-start gap-2">
              <div className="flex gap-2">
                {post.tags
                  .filter((tag) => tag.toLowerCase() !== "error analysis")
                  .map((tag) => (
                    <span
                      key={tag}
                      className="font-inter-tight inline-flex items-center uppercase text-[0.65rem] font-semibold tracking-tight text-accent-foreground bg-accent/10 px-1.5 py-0.5 rounded dark:bg-accent/30 dark:text-white"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <span className="font-inter-tight text-xs leading-tight text-muted-foreground">{post.date}</span>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); previewOpen ? setActivePreviewSlug(null) : setActivePreviewSlug(post.slug); }}
              className="absolute bottom-3 right-3 z-10"
            >
              <div className="relative inline-block transform transition-transform duration-150 ease-out">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-[2px] translate-y-[2px] bg-black rounded-md"
                />
                <span
                  className={`
                    relative block
                    border-2 border-black dark:border-[#963C4B]
                    rounded-md w-12 h-8 flex items-center justify-center
                    transition-all duration-150 ease-out
                    flex items-center gap-1
                    ${
                      previewOpen
                        ? 'translate-x-[2px] translate-y-[2px] bg-accent text-background dark:bg-[#963C4B] dark:text-white'
                        : 'bg-card dark:bg-[#1E0F13] text-black dark:text-white hover:-translate-y-[1px] hover:bg-accent hover:text-background dark:hover:bg-[#963C4B] dark:hover:text-white'
                    }
                  `}
                >
                  <img src={previewEyeIcon} alt="Preview" className="w-6 h-6 filter dark:invert" />
                </span>
              </div>
            </button>
          </div>
        </Link>
        <div
          className={`absolute left-0 right-0 bottom-0 top-[57%] bg-background dark:bg-[#1E0F13] border border-accent p-6
            transform ${previewOpen 
              ? 'translate-y-0 opacity-100 pointer-events-auto' 
              : 'translate-y-full opacity-0 pointer-events-none'}
            transition-all duration-300 ease-out`}
        >
          <button
            onClick={() => setActivePreviewSlug(null)}
            className="absolute top-2 right-2 text-2xl font-semibold p-2 text-muted-foreground hover:text-accent"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
          <p className="text-base text-muted-foreground dark:text-white">{post.description}</p>
        </div>
      </div>
    </div>
  );
}
