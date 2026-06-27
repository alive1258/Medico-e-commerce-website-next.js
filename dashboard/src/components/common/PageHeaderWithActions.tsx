import React from "react";
import { Search,  type LucideIcon } from "lucide-react";
import GradientButton from "../ui/buttons/GradientButton";
import { useThemeColors } from "../../redux/features/useThemeColors";


interface ActionButton {
  text: string;
  icon?: LucideIcon;
  link?: string;
  onClick?: () => void;
}

interface PageHeaderWithActionsProps {
  title: string;
  subtitle?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  actionButtons?: ActionButton[];
}

const PageHeaderWithActions: React.FC<PageHeaderWithActionsProps> = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  actionButtons = [],
}) => {
  const { theme, textColor, inputBg, inputBorder } = useThemeColors();

  return (
    <div
      className={`p-4 rounded-t-lg border ${
        theme === "dark" ? "border-gray-800" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        {/* Title & Subtitle */}
        <div className="min-w-0">
          <h1
            className={`text-lg lg:text-xl font-semibold truncate ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`text-sm truncate mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions & Search */}
        <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
          {onSearchChange && (
            <div
              className={`relative flex-1 lg:flex-auto border flex items-stretch rounded-lg ${
                theme === "dark" ? "border-gray-800" : "border-gray-300"
              }`}
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className={textColor} size={16} />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
              />
            </div>
          )}

          {/* Action buttons */}
          {actionButtons.map((btn, idx) =>
            btn.link ? (
              <GradientButton
                key={idx}
                text={btn.text}
                icon={btn.icon}
                link={btn.link}
              />
            ) : (
              <button
                key={idx}
                onClick={btn.onClick}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {btn.icon && <btn.icon size={16} />}
                <span className="hidden md:inline">{btn.text}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeaderWithActions;
