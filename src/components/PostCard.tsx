
import previewEyeIcon from '@/assets/preview-eye.png';
import { Link, useNavigate } from 'react-router-dom';
import type { Post } from '@/data/posts';
import { LazyImage } from './LazyImage';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Eye, Image } from 'lucide-react';

interface PostCardProps {
  post: Post;
  author?: {
    id: string;
    name: string;
    slug: string;
  };
}

export function PostCard({ post, author }: PostCardProps) {
  const navigate = useNavigate();
  const imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60`;
  const placeholderUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=20&blur=10&auto=format&fit=crop&q=20`;

  const [activePreviewSlug, setActivePreviewSlug] = useState<string | null>(null);
  const previewOpen = activePreviewSlug === post.slug;
  const cardRef = useRef<HTMLDivElement>(null);

  // Check if this is a case study with imaging
  const isCaseStudy = post.category === 'Case Study';
  const hasImaging = isCaseStudy && post.tags.some(tag => 
    ['CT', 'MRI', 'X-Ray', 'Ultrasound', 'Nuclear Medicine'].some(modality => 
      tag.toLowerCase().includes(modality.toLowerCase())
    )
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActivePreviewSlug(null);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && previewOpen) {
        setActivePreviewSlug(null);
      }
    }

    if (previewOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [previewOpen]);

  const handlePreviewToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;
    
    previewOpen ? setActivePreviewSlug(null) : setActivePreviewSlug(post.slug);
  };

  const handleViewImages = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Generate a case ID from the post slug for the viewer
    const caseId = post.slug.replace(/[^a-zA-Z0-9]/g, '-');
    navigate(`/viewer/${caseId}`);
  };

  return (
    <div 
      ref={cardRef} 
      className="group col-span-12 md:col-span-6 lg:col-span-3 hover-lift" 
      onClick={() => previewOpen && setActivePreviewSlug(null)}
    >
      <article 
        className="bg-[#fdfcfb] dark:bg-[#1E0F13] rounded-lg shadow-[6px_6px_0px_rgb(0,0,0)] dark:shadow-[6px_6px_0px_rgba(114,43,55,1)] border-[2.5px] border-black group-hover:border-accent dark:border-[#722b37] dark:group-hover:border-[#722b37] overflow-hidden relative flex flex-col justify-between h-full transform transition-all duration-200 ease-out group-hover:scale-[1.005]" 
        onClick={(e) => e.stopPropagation()}
        role="article"
        aria-label={`Article: ${post.title}`}
      >
        <Link 
          to={`/posts/${post.slug}`} 
          className="flex-1 flex flex-col justify-between h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
          aria-describedby={`post-${post.id}-description`}
        >
          <div className="aspect-[7/4] relative overflow-hidden">
            <LazyImage
              src={imageUrl}
              placeholderSrc={placeholderUrl}
              alt={`Featured image for ${post.title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {hasImaging && (
              <div className="absolute top-2 left-2 bg-accent/90 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Image className="w-3 h-3" />
                Interactive Images
              </div>
            )}
          </div>
          
          <div className="p-4 md:p-5 flex flex-col flex-1 space-fluid-sm">
            <h3 className="font-jersey25 text-2xl md:text-3xl leading-tight tracking-tight font-semibold text-foreground mb-2">
              {post.title}
            </h3>
            
            <p 
              id={`post-${post.id}-description`}
              className="font-inter-tight text-base md:text-lg leading-snug tracking-tight text-muted-foreground mb-4 line-clamp-2"
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
        </Link>

        {/* Action buttons */}
        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
          {hasImaging && (
            <Button
              size="sm"
              onClick={handleViewImages}
              className="bg-accent hover:bg-accent/90 text-black font-medium h-8 px-3 text-xs"
              aria-label={`View images for ${post.title}`}
            >
              <Eye className="w-3 h-3 mr-1" />
              View Images
            </Button>
          )}
          
          <button
            onClick={handlePreviewToggle}
            onKeyDown={handlePreviewToggle}
            className="touch-target focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
            aria-label={previewOpen ? `Close preview of ${post.title}` : `Preview ${post.title}`}
            aria-expanded={previewOpen}
            aria-controls={`preview-${post.id}`}
          >
            <div className="relative inline-block transform transition-transform duration-150 ease-out">
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-[2px] translate-y-[2px] rounded-md bg-black dark:bg-[#722b37]"
              />
              <span
                className={`
                  relative border-2 border-black dark:border-[#722b37] rounded-md w-12 h-8 flex items-center justify-center gap-1 transition-all duration-150 ease-out
                  ${
                    previewOpen
                      ? 'translate-x-[2px] translate-y-[2px] bg-accent text-background dark:bg-[#722b37] dark:text-white'
                      : 'bg-card dark:bg-[#1E0F13] text-black dark:text-white hover:-translate-y-[1px] hover:bg-accent hover:text-background dark:hover:bg-[#722b37] dark:hover:text-white'
                  }
                `}
              >
                <img 
                  src={previewEyeIcon} 
                  alt="" 
                  className="w-6 h-6 filter dark:invert" 
                  aria-hidden="true"
                />
              </span>
            </div>
          </button>
        </div>

        <div
          id={`preview-${post.id}`}
          className={`absolute left-0 right-0 bottom-0 top-0 bg-background dark:bg-[#2A1B1F] p-4
            shadow-[6px_6px_0px_rgb(0,0,0)] dark:shadow-[6px_6px_0px_rgba(114,43,55,1)]
            transform ${previewOpen 
              ? 'translate-y-0 opacity-100 pointer-events-auto' 
              : 'translate-y-full opacity-0 pointer-events-none'}
            transition-all duration-200 ease-out`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`preview-title-${post.id}`}
          aria-describedby={`preview-desc-${post.id}`}
        >
          <h3 
            id={`preview-title-${post.id}`}
            className="text-2xl font-bold mb-2"
          >
            {post.title}
          </h3>
          <p 
            id={`preview-desc-${post.id}`}
            className="text-base text-muted-foreground dark:text-white mb-4"
          >
            {post.description}
          </p>
          {hasImaging && (
            <div className="mb-4">
              <Button
                onClick={handleViewImages}
                className="bg-accent hover:bg-accent/90 text-black font-medium"
              >
                <Eye className="w-4 h-4 mr-2" />
                Launch DICOM Viewer
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Press Escape to close preview
          </p>
        </div>
      </article>
    </div>
  );
}
