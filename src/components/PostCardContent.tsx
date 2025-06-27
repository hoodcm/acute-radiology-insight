
import type { Post } from '@/data/posts';

interface PostCardContentProps {
  post: Post;
  author?: {
    id: string;
    name: string;
    slug: string;
  };
}

export function PostCardContent({ post, author }: PostCardContentProps) {
  return (
    <div className="p-4 md:p-5 flex flex-col flex-1 space-fluid-sm">
      <h3 className="font-jersey25 text-2xl md:text-3xl leading-snug tracking-tight font-semibold text-foreground mb-2">
        {post.title}
      </h3>
      
      <p 
        id={`post-${post.id}-description`}
        className="font-inter-tight text-base md:text-lg leading-normal tracking-tight text-muted-foreground mb-4 line-clamp-2"
      >
        {post.description}
      </p>
      
      <div className="mt-auto space-y-2">
        <div className="flex gap-2 flex-wrap">
          {post.tags
            .filter((tag) => tag.toLowerCase() !== "error analysis")
            .map((tag) => (
              <span
                key={tag}
                className="font-inter-tight inline-flex items-center uppercase text-[0.65rem] font-semibold tracking-tight text-accent-foreground bg-accent/10 px-1.5 py-0.5 rounded dark:bg-accent/30 dark:text-white"
                role="tag"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <time 
            className="font-inter-tight text-xs leading-tight text-muted-foreground"
            dateTime={post.date}
          >
            {post.date}
          </time>
          {author && (
            <span className="font-inter-tight text-xs text-muted-foreground">
              by {author.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
