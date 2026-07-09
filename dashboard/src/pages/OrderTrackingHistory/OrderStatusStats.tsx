// src/pages/OrderTracking/OrderStatusStats.tsx
import React from "react";
import { useGetOrderStatusStatsQuery } from "../../redux/api/orderTrackingApi";
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ApiError } from "../../types/authType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const STATUS_COLORS: Record<string, string> = {
  pending: "#eab308",
  confirmed: "#3b82f6",
  processing: "#8b5cf6",
  shipped: "#6366f1",
  out_for_delivery: "#f97316",
  delivered: "#22c55e",
  cancelled: "#ef4444",
  returned: "#ec4899",
  refunded: "#6b7280",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock size={18} />,
  confirmed: <Clock size={18} />,
  processing: <Clock size={18} />,
  shipped: <Package size={18} />,
  out_for_delivery: <Package size={18} />,
  delivered: <CheckCircle size={18} />,
  cancelled: <XCircle size={18} />,
  returned: <AlertCircle size={18} />,
  refunded: <RefreshCw size={18} />,
};

const OrderStatusStats: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetOrderStatusStatsQuery();

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-24 w-full animate-pulse rounded bg-neutral-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load statistics
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

  const stats = data?.data || [];
  const totalOrders = stats.reduce((sum, stat) => sum + stat.count, 0);

  // Chart data for bar chart
  const barChartData = {
    labels: stats.map((stat) => stat.status.replace(/_/g, " ").toUpperCase()),
    datasets: [
      {
        label: "Number of Orders",
        data: stats.map((stat) => stat.count),
        backgroundColor: stats.map(
          (stat) => STATUS_COLORS[stat.status] || "#6b7280",
        ),
        borderColor: stats.map(
          (stat) => `${STATUS_COLORS[stat.status] || "#6b7280"}90`,
        ),
        borderWidth: 1,
      },
    ],
  };

  // Chart data for pie chart
  const pieChartData = {
    labels: stats.map((stat) => stat.status.replace(/_/g, " ").toUpperCase()),
    datasets: [
      {
        data: stats.map((stat) => stat.count),
        backgroundColor: stats.map(
          (stat) => `${STATUS_COLORS[stat.status] || "#6b7280"}80`,
        ),
        borderColor: stats.map(
          (stat) => STATUS_COLORS[stat.status] || "#6b7280",
        ),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#9ca3af",
          padding: 20,
        },
      },
      title: {
        display: true,
        color: "#f3f4f6",
      },
    },
    scales: {
      x: {
        grid: {
          color: "#1f2937",
        },
        ticks: {
          color: "#9ca3af",
        },
      },
      y: {
        grid: {
          color: "#1f2937",
        },
        ticks: {
          color: "#9ca3af",
        },
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#9ca3af",
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <Package size={24} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Status Count</p>
              <p className="text-2xl font-bold">{stats.length}</p>
            </div>
            <TrendingUp size={24} className="text-green-500" />
          </div>
        </div>
        <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Most Common</p>
              <p className="text-lg font-semibold truncate">
                {stats.length > 0
                  ? stats
                      .reduce((a, b) => (a.count > b.count ? a : b))
                      .status.replace(/_/g, " ")
                      .toUpperCase()
                  : "N/A"}
              </p>
            </div>
            {stats.length > 0 && (
              <span className="text-2xl">
                {
                  STATUS_ICONS[
                    stats.reduce((a, b) => (a.count > b.count ? a : b)).status
                  ]
                }
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
          <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
          <div className="space-y-3">
            {stats.map((stat) => (
              <div key={stat.status} className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium`}
                  style={{
                    backgroundColor: `${STATUS_COLORS[stat.status]}20`,
                    color: STATUS_COLORS[stat.status],
                  }}
                >
                  {STATUS_ICONS[stat.status]}
                  {stat.status.replace(/_/g, " ").toUpperCase()}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(stat.count / totalOrders) * 100}%`,
                          backgroundColor: STATUS_COLORS[stat.status],
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium min-w-[50px]">
                      {stat.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
          <h3 className="text-lg font-semibold mb-4">Visualization</h3>
          <div className="h-[300px]">
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
        <h3 className="text-lg font-semibold mb-4">Detailed Breakdown</h3>
        <div className="h-[300px]">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default OrderStatusStats;
