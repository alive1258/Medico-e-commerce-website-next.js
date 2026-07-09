// src/pages/Prescriptions/PrescriptionDetails.tsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  Trash2,
  FileText,
  User,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Edit,
  Eye,
} from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  useGetSinglePrescriptionQuery,
  useDeletePrescriptionMutation,
  useApprovePrescriptionMutation,
  useRejectPrescriptionMutation,
  useUpdatePrescriptionMutation,
  PrescriptionStatus,
  type IUpdatePrescription,
} from "../../redux/api/prescriptionApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

const STATUS_COLORS: Record<PrescriptionStatus, string> = {
  [PrescriptionStatus.PENDING]: "bg-yellow-500/20 text-yellow-400",
  [PrescriptionStatus.APPROVED]: "bg-green-500/20 text-green-400",
  [PrescriptionStatus.REJECTED]: "bg-red-500/20 text-red-400",
};

const STATUS_ICONS: Record<PrescriptionStatus, React.ReactNode> = {
  [PrescriptionStatus.PENDING]: <Clock size={20} />,
  [PrescriptionStatus.APPROVED]: <CheckCircle size={20} />,
  [PrescriptionStatus.REJECTED]: <XCircle size={20} />,
};

const PrescriptionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  const { data, isLoading, error, refetch } = useGetSinglePrescriptionQuery(
    id!,
    { skip: !id },
  );

  const [deletePrescription] = useDeletePrescriptionMutation();
  const [approvePrescription] = useApprovePrescriptionMutation();
  const [rejectPrescription] = useRejectPrescriptionMutation();
  const [updatePrescription] = useUpdatePrescriptionMutation();

  const prescription = data?.data;

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete prescription from ${prescription?.user?.name || "patient"}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deletePrescription(id!).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Prescription has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/prescriptions");
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Delete failed",
      });
    }
  };

  const handleApprove = async () => {
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

      const response = await approvePrescription(id!).unwrap();
      if (response?.success) {
        toast.success("Prescription approved successfully");
        refetch();
        setIsEditing(false);
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

  const handleReject = async () => {
    try {
      const { value: note } = await Swal.fire({
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
        id: id!,
        admin_note: note || "No reason provided",
      }).unwrap();

      if (response?.success) {
        toast.success("Prescription rejected");
        refetch();
        setIsEditing(false);
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

  const handleUpdate = async () => {
    try {
      const updateData: IUpdatePrescription = {
        admin_note: adminNote || undefined,
      };

      const response = await updatePrescription({
        id: id!,
        data: updateData,
      }).unwrap();

      if (response?.success) {
        toast.success("Prescription updated successfully");
        refetch();
        setIsEditing(false);
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Update failed",
      });
    }
  };

  const getStatusBadge = (status: PrescriptionStatus) => {
    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${STATUS_COLORS[status]}`}
      >
        {STATUS_ICONS[status]}
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6 space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="h-64 w-full animate-pulse rounded bg-neutral-800" />
          </div>
          <div className="space-y-4">
            <div className="h-32 w-full animate-pulse rounded bg-neutral-800" />
            <div className="h-32 w-full animate-pulse rounded bg-neutral-800" />
          </div>
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
            Failed to load prescription
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

  if (!prescription) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <FileText size={48} className="text-gray-400 mb-3" />
        <h2 className="text-lg font-semibold text-gray-400 mb-2">
          Prescription not found
        </h2>
        <Link to="/prescriptions">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
            Back to Prescriptions
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Prescription Details"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Prescriptions", link: "/prescriptions" },
          { title: `Prescription #${prescription.id.slice(0, 8)}` },
        ]}
      />

      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/prescriptions")}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          {prescription.status === PrescriptionStatus.PENDING && (
            <>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition"
              >
                <CheckCircle size={16} /> Approve
              </button>
              <button
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
              >
                <XCircle size={16} /> Reject
              </button>
            </>
          )}
          {!isEditing ? (
            <button
              onClick={() => {
                setIsEditing(true);
                setAdminNote(prescription.admin_note || "");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              <Edit size={16} /> Edit Note
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                <RefreshCw size={16} /> Save Note
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
              >
                Cancel
              </button>
            </>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Prescription Image
            </h3>
            <a
              href={prescription.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={prescription.image_url}
                alt="Prescription"
                className="w-full rounded-lg border border-gray-base object-contain max-h-[500px]"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.png";
                }}
              />
            </a>
            <div className="mt-2 text-center">
              <a
                href={prescription.image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline flex items-center justify-center gap-1"
              >
                <Eye size={14} /> View Full Image
              </a>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            {/* Status */}
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Status</h3>
              {getStatusBadge(prescription.status)}
            </div>

            {/* Patient Info */}
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Patient Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <User size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">
                      {prescription.user?.name || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {prescription.user?.email || "No email"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-400">User ID</div>
                    <div className="font-mono text-sm">
                      {prescription.user_id}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Note */}
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Admin Note
              </h3>
              {isEditing ? (
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={4}
                  placeholder="Add admin note..."
                  className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              ) : (
                <p className="text-gray-300">
                  {prescription.admin_note || "No notes added"}
                </p>
              )}
            </div>

            {/* Timestamps */}
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Created</span>
                  <p className="font-medium">
                    {format(
                      new Date(prescription.created_at),
                      "MMM d, yyyy h:mm a",
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Updated</span>
                  <p className="font-medium">
                    {format(
                      new Date(prescription.updated_at),
                      "MMM d, yyyy h:mm a",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
