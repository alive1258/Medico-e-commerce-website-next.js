import React, { useState, useCallback } from "react";
import { ChevronsUpDown } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { navigationItems } from "../../config/dashboard/navigation-itmes.config";


const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Use callback to prevent unnecessary re-renders of SidebarItems
  const handleOpenMenu = useCallback((name: string | null) => {
    setOpenMenu(name);
  }, []);

  return (
    <aside className="hidden md:flex md:flex-col md:w-72 h-screen sticky top-0 bg-black-base border-r border-gray-base">
      {/* FIXED HEADER */}
      <div className="flex items-center px-4 h-16 border-b border-gray-base shrink-0">
        <div className="w-full flex gap-3 items-center">
          <span className="flex items-center justify-center bg-blue-600 text-white w-8 h-8 rounded-lg font-bold shadow-lg shadow-blue-600/20">
            A
          </span>
          <span className="font-semibold  text-lg grow truncate">
            Asian IT Inc
          </span>
          <ChevronsUpDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
        {navigationItems?.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            openMenu={openMenu}
            setOpenMenu={handleOpenMenu}
          />
        ))}
      </nav>

  
    </aside>
  );
};

export default React.memo(Sidebar);