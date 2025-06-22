
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

type AuthorBreadcrumbsProps = {
  items: Array<{
    label: string;
    href?: string;
  }>;
};

export function AuthorBreadcrumbs({ items }: AuthorBreadcrumbsProps) {
  const linkClasses = "text-xs uppercase font-sans text-muted-foreground hover:text-foreground hover:underline transition-colors";

  return (
    <Breadcrumb className="mb-4 md:mb-6">
      <BreadcrumbList>
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-xs uppercase font-sans text-foreground max-w-48 sm:max-w-96 truncate">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
