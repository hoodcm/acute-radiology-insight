
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { getSectionByCategory } from "@/config/navigation";

type BreadcrumbsProps = {
  postTitle: string;
  postCategory: string;
};

export function Breadcrumbs({ postTitle, postCategory }: BreadcrumbsProps) {
  const section = getSectionByCategory(postCategory);
  const categoryUrl = section?.href || '/';
  const categoryName = section?.name || postCategory;
  
  const linkClasses = "text-xs uppercase font-sans text-muted-foreground hover:text-foreground hover:underline transition-colors";

  return (
    <Breadcrumb className="mb-4 md:mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className={linkClasses}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={categoryUrl} className={linkClasses}>{categoryName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-xs uppercase font-sans text-foreground max-w-48 sm:max-w-96 truncate">
            {postTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
