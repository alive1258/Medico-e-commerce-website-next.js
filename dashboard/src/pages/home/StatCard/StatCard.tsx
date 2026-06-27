import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useThemeColors } from "../../../redux/features/useThemeColors";


interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  bgColor?: string;
}

const StatCard = ({
  title,
  value,
  trend,
  isPositive = true,
  icon,
  bgColor,
}: StatCardProps) => {
  const { theme, classNames } = useThemeColors();

  // Theme-based colors
  const cardBg =
    bgColor ||
    classNames(
      "rounded-2xl p-6 border transition-all duration-300 group",
      "bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-gray-700",
      "bg-gradient-to-br from-white to-gray-50 border-gray-300 border hover:border-gray-400"
    );

  const iconBg = isPositive
    ? classNames("p-3 rounded-lg", "bg-green-500/10", "bg-green-100")
    : classNames("p-3 rounded-lg", "bg-red-500/10", "bg-red-100");

  const trendBg = isPositive
    ? classNames(
      "flex items-center text-sm font-semibold px-3 py-1.5 rounded-full",
      "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10",
      "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300 shadow-lg shadow-green-500/10"
    )
    : classNames(
      "flex items-center text-sm font-semibold px-3 py-1.5 rounded-full",
      "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10",
      "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300 shadow-lg shadow-red-500/10"
    );

  const trendIndicator = isPositive
    ? classNames(
      "text-xs px-2 py-0.5 mt-2 rounded",
      "bg-green-500/10 text-green-300",
      "bg-green-100 text-green-700"
    )
    : classNames(
      "text-xs px-2 py-0.5 mt-2 rounded",
      "bg-red-500/10 text-red-300",
      "bg-red-100 text-red-700"
    );

  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const lineColor = isPositive
    ? classNames("h-1 w-12 mt-3 rounded-full", "bg-green-500", "bg-green-600")
    : classNames("h-1 w-12 mt-3 rounded-full", "bg-red-500", "bg-red-600");

  return (
    <div className={cardBg}>
      <div className="flex items-center justify-between mb-4">
        <div className={iconBg}>{icon}</div>

        {trend && (
          <div className="text-right">
            <div className={trendBg}>
              {isPositive ? (
                <TrendingUp size={14} className="animate-pulse" />
              ) : (
                <TrendingDown size={14} className="animate-pulse" />
              )}
              {trend}
            </div>

            <div className={trendIndicator}>
              {isPositive ? "Increasing" : "Decreasing"}
            </div>
          </div>
        )}
      </div>

      <h3 className={`text-3xl font-bold ${textColor} mb-2`}>{value}</h3>
      <p className={`${subTextColor} text-sm`}>{title}</p>

      <div className={lineColor}></div>
    </div>
  );
};

export default StatCard;