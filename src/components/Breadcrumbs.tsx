
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
  postCategory: string;
};

const categoryToPathMap: { [key: string]: string } = {
  'Case Study': '/cases',
  'Essay': '/essays',
  'Hindsight': '/hindsight',
  'Tool': '/tools',
};

export function Breadcrumbs({ postTitle, postCategory }: BreadcrumbsProps) {
  const categoryUrl = categoryToPathMap[postCategory] || '/';
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
            <Link to={categoryUrl} className={linkClasses}>{postCategory}</Link>
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
