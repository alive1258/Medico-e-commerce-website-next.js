import { useState } from "react";
import { useThemeColors } from "../../../redux/features/useThemeColors";
import { Calendar, Filter, RefreshCw, Search } from "lucide-react";

const FilterSection = () => {
  const {
    theme,
    cardBg,
    borderColor,
    textColor,
    inputBg,
    inputBorder,
    buttonPrimary,
    buttonSecondary,
    info,
  } = useThemeColors();

  const [selectedFilter, setSelectedFilter] = useState<
    "today" | "thisweek" | "thismonth" | "custom"
  >("today");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handleFilterClick = (
    filter: "today" | "thisweek" | "thismonth" | "custom",
  ) => {
    setSelectedFilter(filter);
    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      setDateFrom(today);
      setDateTo(today);
    } else if (filter === "thisweek") {
      const today = new Date();
      const firstDay = new Date(
        today.setDate(today.getDate() - today.getDay()),
      );
      const lastDay = new Date(
        today.setDate(today.getDate() - today.getDay() + 6),
      );
      setDateFrom(firstDay.toISOString().split("T")[0]);
      setDateTo(lastDay.toISOString().split("T")[0]);
    } else if (filter === "thismonth") {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setDateFrom(firstDay.toISOString().split("T")[0]);
      setDateTo(lastDay.toISOString().split("T")[0]);
    }
  };

  const handleReset = () => {
    setSelectedFilter("today");
    setDateFrom("");
    setDateTo("");
    setSearchTerm("");
    handleFilterClick("today");
  };

  const handleSearch = () => {
    console.log("Searching with:", {
      dateFrom,
      dateTo,
      searchTerm,
      filter: selectedFilter,
    });
    // Implement your search logic here
  };
  return (
    <>
      <div
        className={`${cardBg} rounded-lg ${borderColor} overflow-hidden p-6 mb-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Filter size={20} className={info} />
            <h2 className={`text-lg font-normal ${textColor} ml-2`}>
              Retail Sales
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${textColor}`}>Active Filter:</span>
            <span
              className={`px-3 py-1 ${
                theme === "dark"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-blue-100 text-blue-700"
              } rounded-full text-sm font-normal capitalize`}
            >
              {selectedFilter}
            </span>
          </div>
        </div>

        <div
          className={`flex flex-col lg:flex-row items-stretch gap-4 p-6 ${
            theme === "dark" ? "bg-gray-900/30" : "bg-gray-100"
          } rounded-md ${borderColor}`}
        >
          {/* Left Section - Inputs */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date From */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                From
              </label>
              <div className="relative flex-1 flex items-stretch">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Calendar className={textColor} size={16} />
                </div>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    setSelectedFilter("custom");
                  }}
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>

            {/* Date To */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                To
              </label>
              <div className="relative flex-1 flex items-stretch">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Calendar className={textColor} size={16} />
                </div>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setSelectedFilter("custom");
                  }}
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>

            {/* Search Customer */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                Search
              </label>
              <div className="relative flex-1 flex items-stretch">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className={textColor} size={16} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Customer....."
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>

            {/* Invoice no */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                Invoice no
              </label>
              <div className="relative flex-1 flex items-stretch">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className={textColor} size={16} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Invoice no....."
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>
          </div>

          {/* Right Section - Buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Action Buttons Container */}
            <div className="flex flex-col">
              <label
                className={`block text-xs font-normal ${textColor} mb-1 shrink-0 opacity-0`}
              >
                &nbsp;
              </label>
              <div className="flex gap-3">
                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 ${buttonPrimary}`}
                >
                  <Search size={18} />
                  <span className="font-medium">SEARCH</span>
                </button>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 border ${buttonSecondary} ${textColor}`}
                >
                  <RefreshCw
                    size={18}
                    className="group-hover:rotate-180 transition-transform duration-700"
                  />
                  <span className="font-medium">RESET</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
