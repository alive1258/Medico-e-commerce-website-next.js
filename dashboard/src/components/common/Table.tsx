// components/common/Table.tsx
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileText,
  Download,
  ListFilter,
  Package,
} from "lucide-react";
import { useThemeColors } from "../../redux/features/useThemeColors";


export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

export interface TableProps {
  title: string;
  subtitle?: string;
  columns: TableColumn[];
  data: any[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  onDownload?: () => void;
  onColumnSettings?: () => void;
  showPagination?: boolean;
  showHeader?: boolean;
  borderless?: boolean;
}

const Table: React.FC<TableProps> = ({
  title,
  subtitle,
  columns,
  data,
  totalItems,
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange,
  onItemsPerPageChange,
  onDownload,
  onColumnSettings,
  showPagination = true,
  showHeader = true,
  borderless = false,
}) => {
  const {
    theme,
    borderColor,
    borderTable = borderColor,
    tableHeaderBg,
    tableRowEven,
    tableRowOdd,
    tableRowHover,
    textColor,
    subTextColor,
   
  } = useThemeColors();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(parseInt(e.target.value));
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }
      
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div
      className={`rounded-lg ${borderless ? "" : `border-t border-r ${borderTable}`} overflow-hidden`}
    >
      <div className="overflow-x-auto">
        {/* Table Header */}
        {showHeader && (
          <div
            className={`p-4 ${
              theme === "dark"
                ? "border-l rounded-t-lg border-gray-800"
                : "border-l rounded-t-lg border-gray-200 bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-600 to-blue-800"
                      : "bg-gradient-to-r from-blue-500 to-blue-600"
                  }`}
                >
                  <FileText className="text-white" size={20} />
                </div>
                <div>
                  <h1
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {title}
                  </h1>
                  {subtitle && (
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 items-center">
                {onDownload && (
                  <button
                    onClick={onDownload}
                    className={`${borderColor} cursor-pointer px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                    } transition-colors`}
                  >
                    <Download
                      className={
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      }
                      size={16}
                    />
                    Download PDF
                  </button>
                )}

                {onColumnSettings && (
                  <button
                    onClick={onColumnSettings}
                    className={`${borderColor} cursor-pointer px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                    } transition-colors`}
                  >
                    <ListFilter
                      className={
                        theme === "dark" ? "text-purple-400" : "text-purple-600"
                      }
                      size={16}
                    />
                    Columns
                    <ChevronDown className="ml-1" size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Table Content */}
        <table className="w-full">
          <thead>
            <tr
              className={`${tableHeaderBg} ${
                theme === "dark"
                  ? " border-t border-gray-800"
                  : "border-t border-gray-300"
              }`}
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`py-2.5 px-6 text-left font-semibold text-sm ${column.className || ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className={`${tableRowHover} ${
                    index % 2 === 0 ? tableRowEven : tableRowOdd
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={`${index}-${column.key}`}
                      className={`py-2.5 px-6 `}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Package size={48} className="mb-3 opacity-30" />
                    <p className={`text-xl font-medium ${subTextColor} mb-2`}>
                      No data found
                    </p>
                    <p className={`text-sm ${subTextColor}`}>
                      There are no records to display
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Footer - Pagination */}
        {showPagination && data.length > 0 && (
          <div
            className={`p-4 ${
              theme === "dark"
                ? "border-l rounded-b-lg border-gray-800"
                : "border-l rounded-b-lg border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center gap-4">
                <div className={`text-sm ${subTextColor}`}>
                  <span className="font-medium">Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className={`ml-2 px-2 py-1 text-sm rounded border outline-none ${borderColor}`}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <div className={`text-sm ${subTextColor}`}>
                  <span className={`${textColor} font-medium`}>
                    {startItem}-{endItem}
                  </span>{" "}
                  of{" "}
                  <span className={`${textColor} font-medium`}>{totalItems}</span>
                </div>
              </div>

              {/* Right side - Pagination */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-1">
                    {renderPaginationNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {typeof page === "number" ? (
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                              page === currentPage
                                ? theme === "dark"
                                  ? "bg-blue-600 text-white"
                                  : "bg-blue-500 text-white"
                                : theme === "dark"
                                ? "text-gray-300 hover:bg-gray-800"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {page}
                          </button>
                        ) : (
                          <span className={`px-2 ${subTextColor}`}>...</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;