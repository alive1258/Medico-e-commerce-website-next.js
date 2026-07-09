// src/pages/Orders/CreateOrder.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus, Trash2, ShoppingCart, DollarSign, Truck } from "lucide-react";
import Swal from "sweetalert2";
import {
  useCreateOrderMutation,
  PaymentMethod,
  type ICreateOrder,
  type IOrderItem,
} from "../../redux/api/orderApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

interface CreateOrderForm extends Omit<ICreateOrder, "items"> {
  items: IOrderItem[];
  shipping_address?: {
    address_line: string;
    phone?: string;
    email?: string;
  };
}

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [useShippingAddress, setUseShippingAddress] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CreateOrderForm>({
    defaultValues: {
      notes: "",
      payment_method: PaymentMethod.COD,
      items: [
        {
          product_variant_id: "",
          product_name: "",
          sku: "",
          quantity: 1,
          unit_price: 0,
          total_price: 0,
        },
      ],
      shipping_address: {
        address_line: "",
        phone: "",
        email: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");

  // Calculate total price for an item
  const calculateItemTotal = (index: number) => {
    const quantity = watchedItems[index]?.quantity || 0;
    const unitPrice = watchedItems[index]?.unit_price || 0;
    const total = quantity * unitPrice;
    setValue(`items.${index}.total_price`, total);
    return total;
  };

  // Calculate order total
  const calculateOrderTotal = () => {
    return watchedItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
  };

  const onSubmit: SubmitHandler<CreateOrderForm> = async (data) => {
    try {
      const orderData: ICreateOrder = {
        notes: data.notes,
        payment_method: data.payment_method,
        items: data.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
          total_price: Number(item.total_price),
        })),
      };

      if (useShippingAddress && data.shipping_address) {
        orderData.shipping_address = {
          address_line: data.shipping_address.address_line,
          phone: data.shipping_address.phone || undefined,
          email: data.shipping_address.email || undefined,
        };
      }

      const response = await createOrder(orderData).unwrap();

      if (response?.success) {
        toast.success(
          `Order #${response.data.order_number} created successfully`,
        );
        navigate(`/orders/${response.data.id}`);
      } else {
        toast.error(response?.message || "Failed to create order");
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

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create Order"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Orders", link: "/orders" },
          { title: "Create Order" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Order Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Order Items</h3>
            <button
              type="button"
              onClick={() =>
                append({
                  product_variant_id: "",
                  product_name: "",
                  sku: "",
                  quantity: 1,
                  unit_price: 0,
                  total_price: 0,
                })
              }
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              <Plus size={16} /> Add Item
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-black-solid p-4 rounded-lg border border-gray-base"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    label="Product Variant ID"
                    type="text"
                    text={`items.${index}.product_variant_id`}
                    placeholder="UUID"
                    register={register(
                      `items.${index}.product_variant_id` as const,
                      {
                        required: "Required",
                      },
                    )}
                    errors={errors}
                  />
                  <Input
                    label="Product Name"
                    type="text"
                    text={`items.${index}.product_name`}
                    placeholder="Product name"
                    register={register(`items.${index}.product_name` as const, {
                      required: "Required",
                    })}
                    errors={errors}
                  />
                  <Input
                    label="SKU"
                    type="text"
                    text={`items.${index}.sku`}
                    placeholder="SKU"
                    register={register(`items.${index}.sku` as const, {
                      required: "Required",
                    })}
                    errors={errors}
                  />
                  <Input
                    label="Quantity"
                    type="number"
                    text={`items.${index}.quantity`}
                    placeholder="Qty"
                    register={register(`items.${index}.quantity` as const, {
                      required: "Required",
                      min: { value: 1, message: "Min 1" },
                      valueAsNumber: true,
                      onChange: () => calculateItemTotal(index),
                    })}
                    errors={errors}
                  />
                  <Input
                    label="Unit Price ($)"
                    type="number"
                    text={`items.${index}.unit_price`}
                    placeholder="Price"
                    register={register(`items.${index}.unit_price` as const, {
                      required: "Required",
                      min: { value: 0, message: "Min 0" },
                      valueAsNumber: true,
                      onChange: () => calculateItemTotal(index),
                    })}
                    errors={errors}
                  />
                  <Input
                    label="Total Price ($)"
                    type="number"
                    text={`items.${index}.total_price`}
                    placeholder="Auto-calculated"
                    register={register(`items.${index}.total_price` as const)}
                    errors={errors}
                    value={calculateItemTotal(index)}
                    readOnly
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
                  >
                    <Trash2 size={14} /> Remove Item
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Order Total:</span>
              <span className="text-2xl font-bold text-blue-400">
                ${calculateOrderTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Payment Method *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.values(PaymentMethod).map((method) => (
              <label
                key={method}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
                  watch("payment_method") === method
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-base hover:bg-gray-800"
                }`}
              >
                <input
                  type="radio"
                  value={method}
                  {...register("payment_method")}
                  className="hidden"
                />
                <span className="text-sm">{method}</span>
              </label>
            ))}
          </div>
          {errors.payment_method && (
            <p className="text-red-500 text-xs mt-1">
              {errors.payment_method.message}
            </p>
          )}
        </div>

        {/* Shipping Address Toggle */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useShippingAddress}
              onChange={(e) => setUseShippingAddress(e.target.checked)}
              className="w-4 h-4 accent-blue-500"
            />
            <span className="text-sm">Add custom shipping address</span>
          </label>
        </div>

        {/* Shipping Address */}
        {useShippingAddress && (
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Truck size={18} /> Shipping Address
            </h4>
            <Input
              label="Address Line *"
              type="text"
              text="shipping_address.address_line"
              placeholder="Full address"
              register={register("shipping_address.address_line", {
                required: useShippingAddress ? "Required" : false,
              })}
              errors={errors}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Phone"
                type="text"
                text="shipping_address.phone"
                placeholder="Phone number"
                register={register("shipping_address.phone")}
                errors={errors}
              />
              <Input
                label="Email"
                type="email"
                text="shipping_address.email"
                placeholder="Email address"
                register={register("shipping_address.email")}
                errors={errors}
              />
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <Input
            label="Notes"
            type="text"
            text="notes"
            placeholder="Additional notes for the order"
            register={register("notes")}
            errors={errors}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isLoading ? "Creating..." : "Create Order"}
            icon={ShoppingCart}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
