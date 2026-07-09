// src/pages/Payments/CreatePayment.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CreditCard, DollarSign, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import {
  useCreatePaymentMutation,
  PaymentMethod,
  type ICreatePayment,
} from "../../redux/api/paymentApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

interface CreatePaymentForm extends ICreatePayment {}

const CreatePayment: React.FC = () => {
  const navigate = useNavigate();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePaymentForm>({
    defaultValues: {
      order_id: "",
      method: PaymentMethod.COD,
      amount: 0,
      transaction_id: "",
    },
  });

  const selectedMethod = watch("method");

  const onSubmit: SubmitHandler<CreatePaymentForm> = async (data) => {
    try {
      setIsRedirecting(true);
      const response = await createPayment({
        ...data,
        amount: Number(data.amount),
      }).unwrap();

      if (response?.success) {
        // Check if SSLCommerz response (has payment_url)
        if ("payment_url" in response.data) {
          toast.info("Redirecting to payment gateway...");
          // Open SSLCommerz payment URL in new tab
          window.open(response.data.payment_url, "_blank");
          navigate(`/payments/${response.data.payment_id}`);
        } else {
          toast.success("Payment initiated successfully");
          navigate(`/payments/${response.data.id}`);
        }
      } else {
        toast.error(response?.message || "Failed to initiate payment");
        setIsRedirecting(false);
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error.data?.message || "Something went wrong.",
        "error",
      );
      setIsRedirecting(false);
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create Payment"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Payments", link: "/payments" },
          { title: "Create Payment" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Order ID */}
          <div>
            <Input
              label="Order ID *"
              type="text"
              text="order_id"
              placeholder="Enter order UUID"
              register={register("order_id", {
                required: "Order ID is required",
              })}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              The order this payment is for
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Payment Method *
            </label>
            <select
              {...register("method", {
                required: "Payment method is required",
              })}
              className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(PaymentMethod).map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {errors.method && (
              <p className="text-red-500 text-xs mt-1">
                {errors.method.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {selectedMethod === PaymentMethod.COD && "Cash on Delivery"}
              {selectedMethod === PaymentMethod.SSLCOMMERZ &&
                "SSLCommerz gateway (redirects to payment page)"}
              {selectedMethod === PaymentMethod.BKASH && "bKash mobile payment"}
              {selectedMethod === PaymentMethod.NAGAD && "Nagad mobile payment"}
              {selectedMethod === PaymentMethod.ROCKET &&
                "Rocket mobile payment"}
            </p>
          </div>

          {/* Amount */}
          <div>
            <Input
              label="Amount (BDT) *"
              type="number"
              text="amount"
              placeholder="0.00"
              register={register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
                valueAsNumber: true,
              })}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must match the order total amount
            </p>
          </div>

          {/* Transaction ID (Optional) */}
          <div>
            <Input
              label="Transaction ID (Optional)"
              type="text"
              text="transaction_id"
              placeholder="Enter transaction ID"
              register={register("transaction_id")}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Pre-existing transaction ID (usually for COD)
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/payments")}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={
              isRedirecting
                ? "Redirecting..."
                : isLoading
                  ? "Processing..."
                  : selectedMethod === PaymentMethod.SSLCOMMERZ
                    ? "Pay with SSLCommerz"
                    : "Initiate Payment"
            }
            icon={
              selectedMethod === PaymentMethod.SSLCOMMERZ ? (
                <ArrowRight size={18} />
              ) : (
                <CreditCard size={18} />
              )
            }
            disabled={isLoading || isRedirecting}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePayment;
