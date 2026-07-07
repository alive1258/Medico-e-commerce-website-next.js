// src/pages/InventoryLogs/InventoryLogDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  Package,
  FileText,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle,
  Copy,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSingleInventoryLogQuery,
  InventoryLogType,
} from "../../redux/api/inventoryLogApi";
import type { ApiError } from "../../types/authType";

const TYPE_ICONS: Record<InventoryLogType, React.ReactNode> = {
  [InventoryLogType.PURCHASE]: (
    <TrendingUp className="text-green-400" size={20} />
  ),
  [InventoryLogType.SALE]: <TrendingDown className="text-red-400" size={20} />,
  [InventoryLogType.RETURN]: (
    <RefreshCw className="text-yellow-400" size={20} />
  ),
  [InventoryLogType.ADJUSTMENT]: (
    <AlertCircle className="text-blue-400" size={20} />
  ),
};

const TYPE_COLORS: Record<InventoryLogType, string> = {
  [InventoryLogType.PURCHASE]:
    "text-green-400 bg-green-500/10 border-green-500/30",
  [InventoryLogType.SALE]: "text-red-400 bg-red-500/10 border-red-500/30",
  [InventoryLogType.RETURN]:
    "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  [InventoryLogType.ADJUSTMENT]:
    "text-blue-400 bg-blue-500/10 border-blue-500/30",
};

const InventoryLogDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetSingleInventoryLogQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const log = data?.data;

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `${label} copied to clipboard`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading inventory log...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load inventory log
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {err.data?.message || "Server error. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!log) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">Inventory log not found</p>
      </div>
    );
  }

  const isPositive =
    log.type === InventoryLogType.PURCHASE ||
    log.type === InventoryLogType.RETURN;

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-base">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Inventory Log Details</h1>
            <p className="text-sm text-gray-400">ID: {log.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => copyText(log.id, "Log ID")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition"
          >
            <Copy size={16} />
            Copy ID
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Type Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${TYPE_COLORS[log.type]} mb-6`}
        >
          {TYPE_ICONS[log.type]}
          <span className="font-bold">{log.type}</span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Quantity Change</p>
            <p
              className={`text-3xl font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}
            >
              {isPositive ? "+" : "-"}
              {log.quantity}
            </p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Reference ID</p>
            <p className="font-mono text-sm break-all">{log.reference_id}</p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Date & Time</p>
            <p className="font-medium">
              {format(new Date(log.created_at), "PPpp")}
            </p>
          </div>
        </div>

        {/* Product Variant Details */}
        <div className="bg-black-solid p-4 rounded-lg border border-gray-base mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
            <Package size={16} />
            Product Variant Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Product</p>
              <p className="font-medium">
                {log.productVariant?.product?.name || "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Variant ID</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm">{log.product_variant_id}</p>
                <button
                  onClick={() => copyText(log.product_variant_id, "Variant ID")}
                  className="p-1 hover:bg-gray-700 rounded transition"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Strength</p>
              <p>{log.productVariant?.strength || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Pack Size</p>
              <p>{log.productVariant?.pack_size || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">SKU</p>
              <p className="font-mono">{log.productVariant?.sku || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Price</p>
              <p>${log.productVariant?.price?.toFixed(2) || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Remarks */}
        {log.remarks && (
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <FileText size={16} />
              Remarks
            </h3>
            <p className="text-sm">{log.remarks}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryLogDetails;
