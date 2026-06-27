import { memo } from "react";
import { ChevronDown, Dot } from "lucide-react";
import { Link, useLocation } from "react-router";


interface SidebarItemProps {
  item: {
    name: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: SidebarItemProps["item"][];
  };
  isOpen: boolean;
  onToggle: () => void;
}

// Default Tailwind classes for active/inactive items
const activeClasses = "bg-blue-500 text-white";
const activeIconColor = "text-white";
const iconColor = "text-gray-500";
const chevronColor = "text-gray-400";
const activeBg = "bg-blue-100";
const activeTextColor = "text-blue-600";
const childItemText = "text-gray-700";
const childItemHover = "hover:bg-gray-100";
const dotColor = "text-gray-400";

const SidebarData = memo(({ item, isOpen, onToggle }: SidebarItemProps) => {
  const location = useLocation();
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;

  // Check if the current item is active
  const isItemActive = item.href === location.pathname;

  // Check if any child is active
  const hasActiveChild =
    hasChildren &&
    item.children!.some((child) => child.href === location.pathname);

  const isActive = isItemActive || hasActiveChild;

  const baseClasses = `
      w-full flex items-center justify-between
      px-4 py-3 rounded-lg font-medium
      transition-colors duration-200
  `;

  const hasDirectLink = item.href && hasChildren;

  return (
    <div className="mb-1">
      {/* ITEM WITHOUT CHILDREN */}
      {!hasChildren && item.href && (
        <Link
          to={item.href}
          className={`${baseClasses} ${isActive ? activeClasses : ""}`}
        >
          <span className="flex items-center gap-3">
            {Icon && (
              <Icon
                className={`w-5 h-5 ${
                  isActive ? activeIconColor : iconColor
                }`}
              />
            )}
            {item.name}
          </span>
        </Link>
      )}

      {/* ITEM WITH CHILDREN (BUTTON) */}
      {hasChildren && !hasDirectLink && (
        <button
          type="button"
          onClick={onToggle}
          className={`${baseClasses}`}
        >
          <span className="flex items-center gap-3">
            {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
            {item.name}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            } ${chevronColor}`}
          />
        </button>
      )}

      {/* PARENT WITH DIRECT LINK AND CHILDREN */}
      {hasChildren && hasDirectLink && (
        <div className="relative">
          <Link
            to={item.href!}
            className={`${baseClasses} ${isActive ? activeClasses : ""}`}
          >
            <span className="flex items-center gap-3">
              {Icon && (
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? activeIconColor : iconColor
                  }`}
                />
              )}
              {item.name}
            </span>
          </Link>
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-200"
            aria-label="Toggle submenu"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              } ${chevronColor}`}
            />
          </button>
        </div>
      )}

      {/* CHILDREN */}
      {hasChildren && isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children!.map((child) => {
            const ChildIcon = child.icon;
            const isChildActive = child.href === location.pathname;
            const childActiveClasses = isChildActive
              ? `${activeBg} ${activeTextColor}`
              : "";

            return (
              <Link
                key={child.name}
                to={child.href!}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-2.5 rounded-lg font-medium text-sm
                  ${isChildActive ? childActiveClasses : `${childItemText} ${childItemHover}`}
                  transition-colors duration-200
                `}
              >
                <span className="flex items-center gap-3">
                  {ChildIcon ? (
                    <ChildIcon
                      className={`w-4 h-4 ${
                        isChildActive ? activeIconColor : iconColor
                      }`}
                    />
                  ) : (
                    <Dot className={`w-3 h-3 ${dotColor}`} />
                  )}
                  {child.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
});

SidebarData.displayName = "SidebarData";
export default SidebarData;
