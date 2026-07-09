// src/pages/Prescriptions/AllPrescriptions.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Eye,
  Trash2,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Upload,
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllPrescriptionsQuery,
  useDeletePrescriptionMutation,
  useApprovePrescriptionMutation,
  useRejectPrescriptionMutation,
  PrescriptionStatus,
  type IPrescription,
} from "../../redux/api/prescriptionApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import { toast } from "react-toastify";

const LIMIT = 10;

const STATUS_COLORS: Record<PrescriptionStatus, string> = {
  [PrescriptionStatus.PENDING]: "bg-yellow-500/20 text-yellow-400",
  [PrescriptionStatus.APPROVED]: "bg-green-500/20 text-green-400",
  [PrescriptionStatus.REJECTED]: "bg-red-500/20 text-red-400",
};

const STATUS_ICONS: Record<PrescriptionStatus, React.ReactNode> = {
  [PrescriptionStatus.PENDING]: <Clock size={14} />,
  [PrescriptionStatus.APPROVED]: <CheckCircle size={14} />,
  [PrescriptionStatus.REJECTED]: <XCircle size={14} />,
};

const AllPrescriptions: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<PrescriptionStatus | "">("");
  const [filterUserId, setFilterUserId] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllPrescriptionsQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      status: filterStatus || undefined,
      user_id: filterUserId || undefined,
      from_date: dateRange.from || undefined,
      to_date: dateRange.to || undefined,
    });

  const [deletePrescription] = useDeletePrescriptionMutation();
  const [approvePrescription] = useApprovePrescriptionMutation();
  const [rejectPrescription] = useRejectPrescriptionMutation();

  const prescriptions: IPrescription[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDelete = async (prescription: IPrescription) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete prescription from ${prescription.user?.name || prescription.user_id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deletePrescription(prescription.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Prescription has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Delete failed",
      });
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Approve Prescription?",
        text: "This will approve the prescription.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Approve",
        confirmButtonColor: "#22c55e",
      });

      if (!result.isConfirmed) return;

      const response = await approvePrescription(id).unwrap();
      if (response?.success) {
        toast.success("Prescription approved successfully");
        refetch();
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Approval failed",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { value: adminNote } = await Swal.fire({
        title: "Reject Prescription",
        text: "Please provide a reason for rejection:",
        icon: "warning",
        input: "textarea",
        inputPlaceholder: "Enter rejection reason...",
        showCancelButton: true,
        confirmButtonText: "Yes, Reject",
        confirmButtonColor: "#ef4444",
      });

      const response = await rejectPrescription({
        id,
        admin_note: adminNote || "No reason provided",
      }).unwrap();

      if (response?.success) {
        toast.success("Prescription rejected");
        refetch();
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Rejection failed",
      });
    }
  };

  const getStatusBadge = (status: PrescriptionStatus) => {
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
      >
        {STATUS_ICONS[status]}
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load prescriptions
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

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      <div className="overflow-x-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
          <div>
            <h1 className="text-xl font-semibold">Prescriptions</h1>
            <p className="text-sm text-gray-400">
              Manage all patient prescriptions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as PrescriptionStatus | "")
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {Object.values(PrescriptionStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="User ID"
                value={filterUserId}
                onChange={(e) => setFilterUserId(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="date"
                placeholder="From"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange({ ...dateRange, from: e.target.value })
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="date"
                placeholder="To"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={() => refetch()}
                className="p-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
                title="Refresh"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <Link to="/add-prescription">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Upload size={16} /> Upload Prescription
              </button>
            </Link>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-base">
          {Object.values(PrescriptionStatus).map((status) => {
            const count = prescriptions.filter(
              (p) => p.status === status,
            ).length;
            return (
              <div
                key={status}
                className={`bg-black-solid p-3 rounded-lg border ${STATUS_COLORS[status]} border-opacity-20`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{status}</span>
                  <span className="text-xs font-bold">{count}</span>
                </div>
                <div className="text-sm font-semibold">
                  {((count / prescriptions.length) * 100 || 0).toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>

        {/* TABLE */}
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 sm:py-2.5 sm:px-5 text-left border-b border-gray-base font-semibold text-sm">
                #
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Patient
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Prescription
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Status
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Admin Note
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Date
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((prescription, index) => (
                <tr
                  key={prescription.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium">
                        {prescription.user?.name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {prescription.user?.email || prescription.user_id}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <a
                      href={prescription.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:underline"
                    >
                      <FileText size={16} />
                      View Image
                    </a>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {getStatusBadge(prescription.status)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="max-w-[150px] truncate text-sm text-gray-300">
                      {prescription.admin_note || "—"}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      <div>
                        {format(
                          new Date(prescription.created_at),
                          "MMM d, yyyy",
                        )}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(prescription.created_at), "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <div className="flex flex-wrap gap-1">
                      <Link to={`/prescriptions/${prescription.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      {prescription.status === PrescriptionStatus.PENDING && (
                        <>
                          <button
                            onClick={() => handleApprove(prescription.id)}
                            className="p-2 cursor-pointer rounded-md text-green-500 hover:bg-green-500/20"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(prescription.id)}
                            className="p-2 cursor-pointer rounded-md text-red-500 hover:bg-red-500/20"
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(prescription)}
                        className="p-2 cursor-pointer rounded-md text-red-500 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                    <FileText
                      size={48}
                      className="text-gray-400 mx-auto mb-3"
                    />
                    <span className="text-gray-500 text-sm font-medium">
                      No Prescriptions Found
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default AllPrescriptions;
