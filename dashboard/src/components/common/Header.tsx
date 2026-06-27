import React from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import type { RootState } from "../../redux/store";
import Profile, { type User } from "./Profile";

interface HeaderProps {
  user?: User; 
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <header
      className={`flex items-center justify-between h-16 px-4 bg-black-base border-b border-gray-base backdrop-blur sticky top-0 z-20`}
    >
      <div className="flex items-center gap-4">
        <span className="font-semibold ">Dashboard</span>
      </div>

      <div className="flex space-x-4">
        {/* userinfo */}
        {user && <Profile user={user} />}

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition hover:scale-105 active:scale-95"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-blue-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
