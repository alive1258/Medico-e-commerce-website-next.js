import React, { memo, useEffect, useRef, useState } from "react";
import { ChevronDown, Dot } from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarItemProps {
  item: {
    name: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: { name: string; href: string }[];
  };
  openMenu: string | null;
  setOpenMenu: (name: string | null) => void;
}

const SidebarItem = memo(({ item, openMenu, setOpenMenu }: SidebarItemProps) => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(0);

  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  const isItemActive = item.href === location.pathname;
  const hasActiveChild = hasChildren && item.children?.some(child => child.href === location.pathname);

  const isActive = isItemActive || hasActiveChild;
  const isOpen = openMenu === item.name;

  const handleToggle = () => setOpenMenu(isOpen ? null : item.name);

  // Auto-expand if child is active
  useEffect(() => {
    if (hasActiveChild) setOpenMenu(item.name);
  }, [hasActiveChild, item.name, setOpenMenu]);

  // Smooth Height Calculation
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, item.children]);

  return (
    <div className="w-full">
      <div className="relative group">
        <Link
          to={item.href || "#"}
          onClick={(e) => {
            if (hasChildren && !item.href) {
              e.preventDefault();
              handleToggle();
            }
          }}
          className={`
            flex items-center justify-between px-3 py-2.5 rounded-lg font-medium 
            ${isActive 
              ? "bg-blue-600 shadow-md shadow-blue-900/20" 
              : " "}
          `}
        >
          <div className="flex items-center gap-3 truncate">
            {Icon && <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-gray-500"}`} />}
            <span className="truncate text-sm">{item.name}</span>
          </div>

          {hasChildren && (
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} 
            />
          )}
        </Link>
      </div>

      {/* DROPDOWN SECTION */}
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div className="ml-4 mt-1 border-l border-gray-800 flex flex-col gap-0.5">
          {item.children?.map((child) => {
            const isChildActive = location.pathname === child.href;
            return (
              <Link
                key={child.href}
                to={child.href}
                className={`
                  flex items-center gap-2 px-4 py-2 text-xs rounded-r-lg 
                  ${isChildActive 
                    ? "text-blue-400 bg-blue-400/20 border-l-2 border-blue-500 -ml-0.5" 
                    : " hover:text-gray-200 hover:bg-gray-800"}
                `}
              >
                <Dot className={`w-4 h-4 ${isChildActive ? "text-blue-400" : "text-gray-700"}`} />
                <span className="truncate">{child.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default SidebarItem;