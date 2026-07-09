// src/pages/Payments/EditPayment.tsx
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSinglePaymentQuery,
  useUpdatePaymentMutation,
  PaymentStatus,
  type IUpdatePayment,
} from "../../redux/api/paymentApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

interface EditPaymentForm extends IUpdatePayment {
  status: PaymentStatus;
  transaction_id: string;
  failure_reason: string;
}

const EditPayment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditPaymentForm>({
    defaultValues: {
      status: PaymentStatus.PENDING,
      transaction_id: "",
      failure_reason: "",
    },
  });

  const { data: paymentData, isLoading: isLoadingPayment } =
    useGetSinglePaymentQuery(id!, { skip: !id });

  const [updatePayment, { isLoading: isUpdating }] = useUpdatePaymentMutation();

  useEffect(() => {
    if (paymentData?.data) {
      const payment = paymentData.data;
      reset({
        status: payment.status,
        transaction_id: payment.transaction_id || "",
        failure_reason: payment.failure_reason || "",
      });
    }
  }, [paymentData, reset]);

  const onSubmit: SubmitHandler<EditPaymentForm> = async (data) => {
    try {
      const response = await updatePayment({
        id: id!,
        data: {
          status: data.status,
          transaction_id: data.transaction_id || undefined,
          failure_reason: data.failure_reason || undefined,
        },
      }).unwrap();

      if (response?.success) {
        toast.success("Payment updated successfully");
        navigate(`/payments/${id}`);
      } else {
        toast.error(response?.message || "Failed to update payment");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error.data?.message || "Something went wrong.",
        "error",
      );
    }
  };

  if (isLoadingPayment) {
    return (
      <div className="rounded-lg border border-gray-base p-6">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-full animate-pulse rounded bg-neutral-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title={`Edit Payment`}
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Payments", link: "/payments" },
          { title: `Payment #${id?.slice(0, 8)}`, link: `/payments/${id}` },
          { title: "Edit" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Payment Status *
            </label>
            <select
              {...register("status", {
                required: "Status is required",
              })}
              className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(PaymentStatus).map((status) => (
                <option key={status} value={status}>
                  {status.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Transaction ID */}
          <div>
            <Input
              label="Transaction ID"
              type="text"
              text="transaction_id"
              placeholder="Enter transaction ID"
              register={register("transaction_id")}
              errors={errors}
            />
          </div>

          {/* Failure Reason */}
          <div className="md:col-span-2">
            <Input
              label="Failure Reason"
              type="text"
              text="failure_reason"
              placeholder="Enter failure reason (if applicable)"
              register={register("failure_reason")}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide details if payment is failed or cancelled
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/payments/${id}`)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Payment"}
            icon={Save}
            disabled={isUpdating || !isDirty}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPayment;
