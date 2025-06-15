
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

type BreadcrumbsProps = {
  postTitle: string;
};

export function Breadcrumbs({ postTitle }: BreadcrumbsProps) {
  // Hardcoding category and subcategory as they are not in the post data
  const category = "Cases";
  const subcategory = "Beginner";

  const linkClasses = "text-xs uppercase font-sans text-gray-400 hover:text-white hover:underline";

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className={linkClasses}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {/* Assuming static category/subcategory pages for now */}
            <Link to="#" className={linkClasses}>{category}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="#" className={linkClasses}>{subcategory}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-xs uppercase font-sans text-white max-w-48 sm:max-w-96 truncate">
            {postTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
