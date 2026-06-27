import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useThemeColors } from "../../redux/features/useThemeColors";


interface BreadcrumbItem {
  title: string;
  link?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}


const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
      const { textColor} = useThemeColors();
  return (
    <div className="mb-6">
      {/* Title */}
      <h1 className={`mt-0 ${textColor} text-xl font-bold capitalize `}>
        {title}
      </h1>

      {/* Breadcrumbs */}
      <div className="flex items-center text-xs font-medium mt-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {breadcrumb.link ? (
              <Link
                to={breadcrumb.link}
                className={`py-1 text-[13px] leading-4.5 ${textColor} hover:text-blue-500 hover:underline`}
              >
                {breadcrumb.title}
              </Link>
            ) : (
              <span className={`py-1 text-[13px] leading-4.5 text-blue-500 cursor-default`}>
                {breadcrumb.title}
              </span>
            )}

            {index < breadcrumbs.length - 1 && (
              <ChevronRight size={16}  className="mx-1 text-[12px] text-info-muted" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
