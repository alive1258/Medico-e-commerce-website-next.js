// components/tables/StockAlertTable.tsx
import React from "react";
import { TrendingDown } from "lucide-react";
import { useThemeColors } from "../../redux/features/useThemeColors";
import type { TableColumn } from "../../components/common/Table";
import Table from "../../components/common/Table";


interface StockAlertItem {
  product: string;
  company: string;
  primaryUnit: string;
  inStock: number;
  stockPrice: string;
  status: "low" | "critical" | "negative";
}

interface StockAlertTableProps {
  data: StockAlertItem[];
  totalItems: number;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  onDownload?: () => void;
  onColumnSettings?: () => void;
}

const StockAlertTable: React.FC<StockAlertTableProps> = ({
  data,
  totalItems,
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange,
  onItemsPerPageChange,
  onDownload,
  onColumnSettings,
}) => {
  const { textColor, error, classNames } = useThemeColors();

  const columns: TableColumn[] = [
    {
      key: "product",
      label: "Product",
      render: (value: string) => (
        <div className="flex items-center gap-3">
          <div>
            <div className={`font-medium ${textColor}`}>{value}</div>
          </div>
        </div>
      ),
    },
    {
      key: "company",
      label: "Company",
    },
    {
      key: "primaryUnit",
      label: "Primary Unit",
    },
    {
      key: "inStock",
      label: "In Stock (PCS)",
      render: (value: number, row: StockAlertItem) => {
        const stockColor = row.inStock < 0
          ? classNames(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
              "bg-red-900/30 text-red-400 border-red-800/50",
              "bg-red-100 text-red-700 border-red-300"
            )
          : row.inStock <= 2
          ? classNames(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
              "bg-red-900/20 text-red-400 border-red-800/30",
              "bg-red-100 text-red-600 border-red-300"
            )
          : row.inStock <= 4
          ? classNames(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
              "bg-yellow-900/20 text-yellow-400 border-yellow-800/30",
              "bg-yellow-100 text-yellow-600 border-yellow-300"
            )
          : classNames(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
              "bg-green-900/20 text-green-400 border-green-800/30",
              "bg-green-100 text-green-600 border-green-300"
            );

        return (
          <div className={stockColor}>
            {row.inStock < 0 && <TrendingDown size={14} />}
            {value.toLocaleString()} PCS
          </div>
        );
      },
    },
    {
      key: "stockPrice",
      label: "Stock Price",
      render: (value: string) => (
        <div
          className={`font-bold ${
            value.startsWith("-") ? error : textColor
          }`}
        >
          ৳{value}
        </div>
      ),
    },
  ];

  return (
    <Table
      title="Stock Alert Lists"
      subtitle="Products requiring immediate attention"
      columns={columns}
      data={data}
      totalItems={totalItems}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      onDownload={onDownload}
      onColumnSettings={onColumnSettings}
    />
  );
};

export default StockAlertTable;