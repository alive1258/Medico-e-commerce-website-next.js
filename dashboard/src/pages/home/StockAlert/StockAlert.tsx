import React from "react";
import {
  FileText,
  Package,
  Download,
  ListFilter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface StockAlertItem {
  product: string;
  company: string;
  primaryUnit: string;
  inStock: number;
  stockPrice: string;
   status: string;
}

interface StockAlertProps {
  borderTable: string;
  theme: "dark" | "light";
  borderColor: string;
  tableHeaderBg: string;
  borderleftColor: string;
  tableRowHover: string;
  tableRowEven: string;
  tableRowOdd: string;
  error: string;
  textColor: string;
  subTextColor: string;
  stockAlerts: StockAlertItem[];
}

const StockAlert: React.FC<StockAlertProps> = ({
  borderTable,
  theme,
  borderColor,
  tableHeaderBg,
  borderleftColor,
  tableRowHover,
  tableRowEven,
  tableRowOdd,
  error,
  textColor,
  subTextColor,
  stockAlerts,
}) => {
  return (
    <div
      className={`rounded-lg border-t border-r ${borderTable} overflow-hidden`}
    >
      <div className="overflow-x-auto">
        <div
          className={`p-4 ${
            theme === "dark"
              ? "border-l rounded-t-lg border-gray-800"
              : "border-l rounded-t-lg border-gray-200 bg-white"
          }`}
        >
          <div className="md:flex md:space-y-0 space-y-3 justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg w-fit ${
                  theme === "dark"
                    ? "bg-linear-to-r from-blue-600 to-blue-800"
                    : "bg-linear-to-r from-blue-500 to-blue-600"
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
                  Stock Alert Lists
                </h1>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Products requiring immediate attention
                </p>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <button
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

              <button
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
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr
              className={`${tableHeaderBg} ${
                theme === "dark"
                  ? "border-t border-gray-800"
                  : "border-t border-gray-300"
              }`}
            >
              <th
                className={`py-2.5 px-6 text-left ${borderleftColor} font-semibold text-sm`}
              >
                <div className="flex items-center gap-2">
                  <Package size={16} />
                  Product
                </div>
              </th>
              <th
                className={`py-2.5 px-6 text-left ${borderleftColor} font-semibold text-sm`}
              >
                Company
              </th>
              <th
                className={`py-2.5 px-6 text-left ${borderleftColor} font-semibold text-sm`}
              >
                Primary Unit
              </th>
              <th
                className={`py-2.5 px-6 text-left ${borderleftColor} font-semibold text-sm`}
              >
                In Stock (PCS)
              </th>
              <th
                className={`py-2.5 px-6 text-left ${borderleftColor} font-semibold text-sm`}
              >
                Stock Price
              </th>
            </tr>
          </thead>
          <tbody>
            {stockAlerts.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`${tableRowHover} ${
                    index % 2 === 0 ? tableRowEven : tableRowOdd
                  }`}
                >
                  <td className={`py-2.5 px-6 ${borderleftColor}`}>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className={`font-medium`}>{item.product}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-2.5 px-6 ${borderleftColor}`}>
                    {item.company}
                  </td>
                  <td className={`py-2.5 px-6 ${borderleftColor}`}>
                    {item.primaryUnit}
                  </td>
                  <td className={`py-2.5 px-6 ${borderleftColor}`}>
                    <div>{item.inStock.toLocaleString()} PCS</div>
                  </td>
                  <td className={`py-2.5 px-6 ${borderleftColor}`}>
                    <div
                      className={`font-bold ${
                        item.stockPrice.startsWith("-") ? error : textColor
                      }`}
                    >
                      ৳{item.stockPrice}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div
        className={`p-4 ${
          theme === "dark"
            ? "border-l rounded-b-lg border-gray-800"
            : "border-l rounded-b-lg border-gray-200 bg-white"
        }`}
      >
        <div className="md:flex items-center justify-between md:space-y-0 space-y-3">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <div className={`text-sm ${subTextColor}`}>
              <span className="font-medium">Rows per page:</span>
              <select
                className={`ml-2 px-2 py-1 text-sm rounded border outline-none ${borderColor}`}
              >
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>

          {/* Right side - Pagination */}
          <div className="flex items-center space-x-1">
            <div className={`text-sm ${subTextColor}`}>
              <span className={`${textColor} font-medium`}>1-5</span> of{" "}
              <span className={`${textColor} font-medium`}>20</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                className={`p-2 rounded-md ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50"
                }`}
                disabled
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1">
                <button
                  className={`w-8 h-8 rounded text-sm font-medium ${
                    theme === "dark"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  1
                </button>
                <button
                  className={`w-8 h-8 rounded text-sm font-medium ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  2
                </button>
                <button
                  className={`w-8 h-8 rounded text-sm font-medium ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  3
                </button>
                <span className={`px-2 ${subTextColor}`}>...</span>
                <button
                  className={`w-8 h-8 rounded text-sm font-medium ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  10
                </button>
              </div>

              <button
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
    </div>
  );
};

export default StockAlert;