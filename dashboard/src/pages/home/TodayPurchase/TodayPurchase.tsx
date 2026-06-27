import React from "react";
import { ShoppingCart, Calendar, User, FileText, CheckCircle, XCircle } from "lucide-react";

interface Purchase {
  date: string;
  supplierName: string;
  invoiceNo: string;
  totalAmount: number;
  paidAmount: number;
  isApproved: boolean;
}

interface TodayPurchaseProps {
  cardBg: string;
  borderColor: string;
  footerBorder: string;
  textColor: string;
  subTextColor: string;
  tableHeaderBg: string;
  tableRowEven: string;
  tableRowOdd: string;
  tableRowHover: string;
  success: string;
  error: string;
  classNames: (baseClasses: string, darkClasses: string, lightClasses: string) => string;
  todayPurchases: Purchase[];
}

const TodayPurchase: React.FC<TodayPurchaseProps> = ({
  cardBg,
  borderColor,
  footerBorder,
  textColor,
  subTextColor,
  tableHeaderBg,
  tableRowEven,
  tableRowOdd,
  tableRowHover,
  success,
  error,
  classNames,
  todayPurchases,
}) => {
  return (
    <div className={`${cardBg} rounded-lg ${borderColor} overflow-hidden`}>
      <div className={`px-6 py-3 border-b ${footerBorder}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart
              size={20}
              className={classNames("", "text-purple-400", "text-purple-600")}
            />
            <h2 className={`text-xl font-bold ${textColor} ml-3`}>
              Today Purchase | Total: (0.00)
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
                  Supplier Name
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
                Is Approved
              </th>
            </tr>
          </thead>
          <tbody>
            {todayPurchases.length > 0 ? (
              todayPurchases.map((purchase, index) => (
                <tr
                  key={index}
                  className={`border-b ${tableRowHover} ${
                    index % 2 === 0 ? tableRowEven : tableRowOdd
                  }`}
                >
                  <td className={`py-3 px-6 ${subTextColor}`}>
                    {purchase.date}
                  </td>
                  <td className={`py-3 px-6 ${subTextColor}`}>
                    {purchase.supplierName}
                  </td>
                  <td className={`py-3 px-6 ${subTextColor} font-mono`}>
                    {purchase.invoiceNo}
                  </td>
                  <td className={`py-3 px-6 ${textColor} font-semibold`}>
                    ${purchase.totalAmount.toFixed(2)}
                  </td>
                  <td className={`py-3 px-6 ${subTextColor}`}>
                    ${purchase.paidAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      {purchase.isApproved ? (
                        <>
                          <CheckCircle size={16} className={success} />
                          <span className={success}>Approved</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={16} className={error} />
                          <span className={error}>Pending</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <ShoppingCart size={48} className="mb-3 opacity-50" />
                    <p className="text-lg font-medium">Data not found</p>
                    <p className="text-sm mt-1">
                      No purchases recorded for today
                    </p>
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

export default TodayPurchase;