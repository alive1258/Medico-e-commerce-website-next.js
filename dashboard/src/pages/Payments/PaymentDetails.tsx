// src/pages/Payments/PaymentDetails.tsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  Trash2,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  User,
  Package,
  Calendar,
  Edit,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSinglePaymentQuery,
  useDeletePaymentMutation,
  useUpdatePaymentMutation,
  PaymentStatus,
  type IUpdatePayment,
} from "../../redux/api/paymentApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";

const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: "bg-yellow-500/20 text-yellow-400",
  [PaymentStatus.PAID]: "bg-green-500/20 text-green-400",
  [PaymentStatus.FAILED]: "bg-red-500/20 text-red-400",
  [PaymentStatus.REFUNDED]: "bg-purple-500/20 text-purple-400",
  [PaymentStatus.CANCELLED]: "bg-gray-500/20 text-gray-400",
};

const PAYMENT_STATUS_ICONS: Record<PaymentStatus, React.ReactNode> = {
  [PaymentStatus.PENDING]: <Clock size={20} />,
  [PaymentStatus.PAID]: <CheckCircle size={20} />,
  [PaymentStatus.FAILED]: <XCircle size={20} />,
  [PaymentStatus.REFUNDED]: <RefreshCw size={20} />,
  [PaymentStatus.CANCELLED]: <AlertCircle size={20} />,
};

const PaymentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetSinglePaymentQuery(id!, {
    skip: !id,
  });

  const [deletePayment] = useDeletePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();

  const payment = data?.data;

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete payment of $${payment?.amount}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deletePayment(id!).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Payment has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/payments");
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Delete failed",
      });
    }
  };

  const handleStatusUpdate = async (status: PaymentStatus) => {
    try {
      const result = await Swal.fire({
        title: `Update payment status to ${status.toUpperCase()}?`,
        text: "This action will update the payment record.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update",
      });

      if (!result.isConfirmed) return;

      const updateData: IUpdatePayment = { status };
      const response = await updatePayment({
        id: id!,
        data: updateData,
      }).unwrap();

      if (response?.success) {
        toast.success(`Payment status updated to ${status}`);
        refetch();
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

  const getStatusBadge = (status: PaymentStatus) => {
    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${PAYMENT_STATUS_COLORS[status]}`}
      >
        {PAYMENT_STATUS_ICONS[status]}
        {status.toUpperCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6 space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-32 w-full animate-pulse rounded bg-neutral-800" />
            <div className="h-64 w-full animate-pulse rounded bg-neutral-800" />
          </div>
          <div className="h-64 w-full animate-pulse rounded bg-neutral-800" />
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
            Failed to load payment
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

  if (!payment) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <DollarSign size={48} className="text-gray-400 mb-3" />
        <h2 className="text-lg font-semibold text-gray-400 mb-2">
          Payment not found
        </h2>
        <Link to="/payments">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
            Back to Payments
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title={`Payment Details`}
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Payments", link: "/payments" },
          { title: `Payment #${payment.id.slice(0, 8)}` },
        ]}
      />

      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/payments")}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Status Card */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Payment Status
                  </h3>
                  {getStatusBadge(payment.status)}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">
                    ${Number(payment.amount).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400">{payment.method}</div>
                </div>
              </div>
            </div>

            {/* Status Update Actions */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Update Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.values(PaymentStatus).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={payment.status === status}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      payment.status === status
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : `${PAYMENT_STATUS_COLORS[status]} hover:opacity-80`
                    }`}
                  >
                    {status.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-500">Payment ID</span>
                  <p className="font-mono text-sm">{payment.id}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Order</span>
                  <Link to={`/orders/${payment.order_id}`}>
                    <p className="font-mono text-sm text-blue-400 hover:underline">
                      #
                      {payment.order?.order_number ||
                        payment.order_id.slice(0, 8)}
                    </p>
                  </Link>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Method</span>
                  <p className="text-sm font-medium">{payment.method}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Amount</span>
                  <p className="text-sm font-bold text-green-400">
                    ${Number(payment.amount).toFixed(2)}
                  </p>
                </div>
                {payment.transaction_id && (
                  <div className="md:col-span-2">
                    <span className="text-xs text-gray-500">
                      Transaction ID
                    </span>
                    <p className="font-mono text-sm">
                      {payment.transaction_id}
                    </p>
                  </div>
                )}
                {payment.val_id && (
                  <div className="md:col-span-2">
                    <span className="text-xs text-gray-500">Validation ID</span>
                    <p className="font-mono text-sm">{payment.val_id}</p>
                  </div>
                )}
                {payment.failure_reason && (
                  <div className="md:col-span-2">
                    <span className="text-xs text-gray-500 text-red-400">
                      Failure Reason
                    </span>
                    <p className="text-sm text-red-400">
                      {payment.failure_reason}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-gray-500">Created</span>
                  <p className="text-sm">
                    {format(new Date(payment.created_at), "MMM d, yyyy h:mm a")}
                  </p>
                </div>
                {payment.paid_at && (
                  <div>
                    <span className="text-xs text-gray-500">Paid At</span>
                    <p className="text-sm text-green-400">
                      {format(new Date(payment.paid_at), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                )}
                {payment.callback_ip && (
                  <div>
                    <span className="text-xs text-gray-500">Callback IP</span>
                    <p className="font-mono text-sm">{payment.callback_ip}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <h4 className="font-medium flex items-center gap-2 mb-3">
                <Package size={18} /> Order Summary
              </h4>
              {payment.order ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Order #</span>
                    <Link to={`/orders/${payment.order.id}`}>
                      <span className="ml-2 text-blue-400 hover:underline">
                        {payment.order.order_number}
                      </span>
                    </Link>
                  </div>
                  <div>
                    <span className="text-gray-400">Total</span>
                    <span className="ml-2 font-bold">
                      ${Number(payment.order.total_amount).toFixed(2)}
                    </span>
                  </div>
                  {payment.order.user && (
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="text-gray-400">Customer</span>
                      </div>
                      <p className="mt-1">{payment.order.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {payment.order.user.email}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Order details not loaded
                </p>
              )}
            </div>

            {/* Gateway Response (if available) */}
            {payment.gateway_response && (
              <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <RefreshCw size={18} /> Gateway Response
                </h4>
                <pre className="text-xs text-gray-400 overflow-auto max-h-48 p-2 bg-black-base rounded border border-gray-base">
                  {JSON.stringify(
                    JSON.parse(payment.gateway_response),
                    null,
                    2,
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
