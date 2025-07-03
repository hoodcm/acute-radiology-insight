
import type { Post } from '@/lib/postConversion';

interface PostCardContentProps {
  post: Post;
}

export function PostCardContent({ post }: PostCardContentProps) {
  const { title, description, tags, date, id } = post;
  
  return (
    <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 space-fluid-sm">
      <h3 className="font-jersey25 text-lg sm:text-2xl md:text-3xl leading-snug tracking-tight font-semibold text-text-primary mb-1 sm:mb-2">
        {title}
      </h3>
      
      <p 
        id={`post-${id}-description`}
        className="font-inter-tight text-sm sm:text-base md:text-lg leading-normal tracking-tight text-text-secondary mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-2"
      >
        {description}
      </p>
      
      <div className="mt-auto space-y-1 sm:space-y-2">
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          {tags && tags
            .filter((tag) => tag.toLowerCase() !== "error analysis")
            .slice(0, 2) // Limit tags on mobile
            .map((tag) => (
              <span
                key={tag}
                className="font-inter-tight inline-flex items-center uppercase text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-tight text-text-primary bg-accent/10 px-1 sm:px-1.5 py-0.5 rounded dark:bg-accent/30"
                role="tag"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <time 
            className="font-inter-tight text-xs leading-tight text-text-secondary"
            dateTime={date}
          >
            {date}
          </time>
        </div>
      </div>
    </div>
  );
}
