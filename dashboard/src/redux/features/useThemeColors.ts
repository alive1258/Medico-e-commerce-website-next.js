// hooks/useThemeColors.ts - Updated with menu colors
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useThemeColors = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  
  return {
    theme,
    
    // Background Colors
    bgColor: theme === "dark" ? "bg-gray-950" : "bg-[#f3f4f6]",
    bgGradient: theme === "dark" 
      ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black" 
      : "bg-gradient-to-br from-gray-100 via-gray-50 to-white",
    
    // Card/Container Colors
    cardBg: theme === "dark" ? "bg-gray-900/40" : "bg-white",
    cardBgSolid: theme === "dark" ? "bg-gray-900" : "bg-white",
    cardBgHover: theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-50",
    
    // Border Colors
    borderColor: theme === "dark" ? "border-gray-800 border" : "border border-gray-300",
    borderleftColor: theme === "dark" ? "border-gray-800 border-l border-b" : "border-l border-b border-gray-300",
    borderLight: theme === "dark" ? "border-b border-gray-800" : "border-b border-gray-200",
    borderAccent: theme === "dark" ? "border-blue-700" : "border-blue-500",
    borderTable: theme === "dark" ? "border-b border-gray-800" : "border-b border-gray-300",
    
    // Text Colors
    textColor: theme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: theme === "dark" ? "text-gray-400" : "text-gray-600",
    textMuted: theme === "dark" ? "text-gray-500" : "text-gray-400",
    textAccent: theme === "dark" ? "text-blue-400" : "text-blue-600",
    subTextColor: theme === "dark" ? "text-gray-400" : "text-gray-600",
    
    // Input Colors
    inputBg: theme === "dark" ? "bg-gray-900" : "bg-white",
    inputBorder: theme === "dark" ? "border-gray-700" : "border-gray-300",
    inputPlaceholder: theme === "dark" ? "placeholder-gray-500" : "placeholder-gray-400",
    
    // Table Colors
    tableHeaderBg: theme === "dark" ? "bg-gray-800/50" : "bg-gray-200",
    tableRowEven: theme === "dark" ? "bg-gray-900/20" : "bg-gray-50",
    tableRowOdd: theme === "dark" ? "bg-gray-900/40" : "bg-white",
    tableRowHover: theme === "dark" ? "hover:bg-gray-800/30" : "hover:bg-gray-100",
    
    // Footer & Pagination
    footerBg: theme === "dark" 
      ? "bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/70" 
      : "bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100",
    footerBorder: theme === "dark" ? "border-gray-800/50" : "border-gray-200",
    paginationBg: theme === "dark" ? "bg-blue-600" : "bg-blue-500",
    paginationHover: theme === "dark" 
      ? "hover:text-white hover:bg-gray-800" 
      : "hover:text-gray-900 hover:bg-gray-200",
    paginationText: theme === "dark" ? "text-gray-500" : "text-gray-400",
    
    // Menu Colors (for ActionMenu)
    menuBg: theme === "dark" ? "bg-gray-900" : "bg-white",
    menuBorder: theme === "dark" ? "border-gray-800" : "border-gray-200",
    menuShadow: theme === "dark" ? "shadow-xl" : "shadow-lg",
    menuItemHover: theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100",
    menuItemText: theme === "dark" ? "text-gray-300" : "text-gray-700",
    menuButtonHover: theme === "dark" 
      ? "hover:text-white hover:bg-gray-800" 
      : "hover:text-gray-900 hover:bg-gray-200",
    menuButtonText: theme === "dark" ? "text-gray-400" : "text-gray-500",
    menuDividerColor: theme === "dark" ? "border-gray-800" : "border-gray-200",
    
    // Button Colors
    buttonPrimary: theme === "dark" 
      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white" 
      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
    
    buttonSecondary: theme === "dark" 
      ? "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border-gray-700" 
      : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-300",
    
    buttonDanger: theme === "dark" 
      ? "bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900" 
      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    
    buttonSuccess: theme === "dark" 
      ? "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900" 
      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    
    // Shadow/Effects
    shadow: theme === "dark" ? "shadow-xl shadow-black/20" : "shadow-xl shadow-gray-200/50",
    shadowSm: theme === "dark" ? "shadow-lg shadow-black/10" : "shadow-lg shadow-gray-200/30",
    
    // Overlay/Backdrop
    backdrop: theme === "dark" ? "backdrop-blur bg-black/30" : "backdrop-blur bg-white/30",
    
    // Status Colors
    success: theme === "dark" ? "text-green-400" : "text-green-600",
    warning: theme === "dark" ? "text-yellow-400" : "text-yellow-600",
    error: theme === "dark" ? "text-red-400" : "text-red-600",
    info: theme === "dark" ? "text-blue-400" : "text-blue-600",
    
    // Utility function for conditional classes
    classNames: (baseClasses: string, darkClasses: string, lightClasses: string) => 
      `${baseClasses} ${theme === "dark" ? darkClasses : lightClasses}`
  };
};

// Type for the hook return value
export type ThemeColors = ReturnType<typeof useThemeColors>;