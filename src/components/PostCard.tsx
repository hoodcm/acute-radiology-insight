
import { Link, useNavigate } from 'react-router-dom';
import type { Post } from '@/data/posts';
import { useState } from 'react';
import { PostCardImage } from './PostCardImage';
import { PostCardContent } from './PostCardContent';
import { PostCardActions } from './PostCardActions';
import { CRTPreviewOverlay } from './CRTPreviewOverlay';

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
  const [activePreviewSlug, setActivePreviewSlug] = useState<string | null>(null);
  const previewOpen = activePreviewSlug === post.slug;

  // Determine if post has interactive imaging based on category and tags
  const isCaseStudy = post.category === 'Case Study';
  const hasImaging = isCaseStudy && post.tags.some(tag => 
    ['CT', 'MRI', 'X-Ray', 'Ultrasound', 'Nuclear Medicine'].some(modality => 
      tag.toLowerCase().includes(modality.toLowerCase())
    )
  );

  const handlePreviewToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;
    
    previewOpen ? setActivePreviewSlug(null) : setActivePreviewSlug(post.slug);
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.blur();
    }
  };

  const handleViewImages = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const caseId = post.slug.replace(/[^a-zA-Z0-9]/g, '-');
    navigate(`/viewer/${caseId}`);
  };

  const handleClosePreview = () => {
    setActivePreviewSlug(null);
  };

  return (
    <>
      <div className="group col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-2 sm:hover-lift">
        <article 
          className="bg-[#fdfcfb] dark:bg-[#1E0F13] rounded-lg shadow-[6px_6px_0px_rgb(0,0,0)] dark:shadow-[6px_6px_0px_rgba(114,43,55,1)] border-[2.5px] border-black md:group-hover:border-accent dark:border-[#722b37] md:dark:group-hover:border-[#722b37] overflow-hidden relative flex flex-col justify-between h-full transform transition-all duration-200 ease-out md:group-hover:-translate-y-0.5" 
          role="article"
          aria-label={`Article: ${post.title}`}
        >
          <Link 
            to={`/posts/${post.slug}`} 
            className="flex-1 flex flex-col justify-between h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
            aria-describedby={`post-${post.id}-description`}
          >
            <PostCardImage post={post} hasImaging={hasImaging} />
            <PostCardContent post={post} author={author} />
          </Link>

          <PostCardActions
            post={post}
            hasImaging={hasImaging}
            previewOpen={previewOpen}
            onViewImages={handleViewImages}
            onPreviewToggle={handlePreviewToggle}
          />
        </article>
      </div>

      <CRTPreviewOverlay
        post={post}
        isOpen={previewOpen}
        hasImaging={hasImaging}
        onClose={handleClosePreview}
        onViewImages={handleViewImages}
      />
    </>
  );
}
