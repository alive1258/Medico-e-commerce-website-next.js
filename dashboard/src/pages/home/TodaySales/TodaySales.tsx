import React from "react";
import { DollarSign, Calendar, User, FileText } from "lucide-react";

interface Sale {
  date: string;
  customer: string;
  invoiceNo: string;
  totalAmount: number;
  paidAmount: number;
  status: "Paid" | "Pending" | "Partial";
}

interface TodaySalesProps {
  cardBg: string;
  borderColor: string;
  footerBorder: string;
  info: string;
  textColor: string;
  subTextColor: string;
  tableHeaderBg: string;
  tableRowEven: string;
  tableRowOdd: string;
  tableRowHover: string;
  classNames: (baseClasses: string, darkClasses: string, lightClasses: string) => string; // Updated to 3 args
  todaySales: Sale[];
}

const TodaySales: React.FC<TodaySalesProps> = ({
  cardBg,
  borderColor,
  footerBorder,
  info,
  textColor,
  subTextColor,
  tableHeaderBg,
  tableRowEven,
  tableRowOdd,
  tableRowHover,
  classNames,
  todaySales,
}) => {
  return (
    <div className={`${cardBg} rounded-lg ${borderColor} overflow-hidden`}>
      <div className={`px-6 py-3 border-b ${footerBorder}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign size={20} className={info} />
            <h2 className={`text-xl font-bold ${textColor} ml-3`}>
              Today Sales | Total: (0.00)
            </h2>
          </div>
          <div className={`flex items-center ${subTextColor} text-sm`}>
            <Calendar size={16} className="mr-2" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={tableHeaderBg}>
              <th
                className={`py-3 px-6 text-left ${subTextColor} font-semibold text-sm`}
              >
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  Date
                </div>
              </th>
              <th
                className={`py-3 px-6 text-left ${subTextColor} font-semibold text-sm`}
              >
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  Customer
                </div>
              </th>
              <th
                className={`py-3 px-6 text-left ${subTextColor} font-semibold text-sm`}
              >
                <div className="flex items-center">
                  <FileText size={16} className="mr-2" />
                  Invoice No
                </div>
              </th>
              <th
                className={`py-3 px-6 text-left ${subTextColor} font-semibold text-sm`}
              >
                Total Amount
              </th>
              <th
                className={`py-3 px-6 text-left ${subTextColor} font-semibold text-sm`}
              >
                Paid Amount
              </th>
              <th
                className={`py-3 px-6 text-left ${subTextColor} font-semibold text-sm`}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {todaySales.length > 0 ? (
              todaySales.map((sale, index) => (
                <tr
                  key={index}
                  className={`border-b ${footerBorder} ${tableRowHover} transition-colors ${
                    index % 2 === 0 ? tableRowEven : tableRowOdd
                  }`}
                >
                  <td className={`py-3 px-6 ${subTextColor}`}>{sale.date}</td>
                  <td className={`py-3 px-6 ${subTextColor}`}>
                    {sale.customer}
                  </td>
                  <td className={`py-3 px-6 ${subTextColor} font-mono`}>
                    {sale.invoiceNo}
                  </td>
                  <td className={`py-3 px-6 ${textColor} font-semibold`}>
                    ${sale.totalAmount.toFixed(2)}
                  </td>
                  <td className={`py-3 px-6 ${subTextColor}`}>
                    ${sale.paidAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sale.status === "Paid"
                          ? classNames(
                              "px-3 py-1 rounded-full text-xs font-medium", // Base classes
                              "bg-green-900/30 text-green-400", // Dark mode
                              "bg-green-100 text-green-700" // Light mode
                            )
                          : sale.status === "Pending"
                          ? classNames(
                              "px-3 py-1 rounded-full text-xs font-medium", // Base classes
                              "bg-yellow-900/30 text-yellow-400", // Dark mode
                              "bg-yellow-100 text-yellow-700" // Light mode
                            )
                          : classNames(
                              "px-3 py-1 rounded-full text-xs font-medium", // Base classes
                              "bg-red-900/30 text-red-400", // Dark mode
                              "bg-red-100 text-red-700" // Light mode
                            )
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FileText size={48} className="mb-3 opacity-50" />
                    <p className="text-lg font-medium">Data not found</p>
                    <p className="text-sm mt-1">No sales recorded for today</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodaySales;