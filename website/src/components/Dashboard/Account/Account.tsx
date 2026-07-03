/* eslint-disable @typescript-eslint/no-explicit-any */
// app/account/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Heart,
  MapPin,
  Lock,
  LogOut,
  Edit,
  Calendar,
  ChevronRight,
  Plus,
  Trash2,
  Home,
  Building,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} from "@/src/redux/api/authApi";
import {
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
} from "@/src/redux/api/orderApi";
import {
  useGetMyAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "@/src/redux/api/addressApi";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/src/redux/api/wishlistApi";
import { useAddToCartMutation } from "@/src/redux/api/cartApi";

// Types
interface Address {
  id: string;
  full_name?: string;
  phone: string;
  email?: string;
  area?: string;
  division?: string;
  district?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  address: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  payment_method: string;
  subtotal: number;
  discount: number;
  delivery_charge: number;
  placed_at: string;
  created_at: string;
  items?: OrderItem[];
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  sku: string;
  product_variant_id: string;
}

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images?: string[];
  };
}

// Components
const Sidebar: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: any;
}> = ({ activeTab, onTabChange, user }) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "password", label: "Change Password", icon: Lock },
  ];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-6">
      {/* User Info */}
      <div className="text-center pb-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto mb-3 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name || "User"}
              width={80}
              height={80}
              className="object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-emerald-600">
              {user?.name?.charAt(0) || "U"}
            </span>
          )}
        </div>
        <h3 className="font-bold text-slate-900">{user?.name || "User"}</h3>
        <p className="text-xs text-slate-500">{user?.email || ""}</p>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-semibold ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-emerald-600" : ""} />
              {item.label}
              {isActive && (
                <ChevronRight size={16} className="ml-auto text-emerald-600" />
              )}
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-semibold text-red-500 hover:bg-red-50 mt-4 pt-4 border-t border-slate-100"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </nav>
    </div>
  );
};

// Profile Tab
const ProfileTab: React.FC<{ user: any; refetch: () => void }> = ({
  user,
  refetch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.mobile || user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateProfile({
        name: formData.name,
        mobile: formData.phone,
        email: formData.email,
      }).unwrap();
      setIsEditing(false);
      refetch();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
        >
          <Edit size={16} />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-4 flex items-center gap-4">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Calendar size={20} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-700">Member since</p>
          <p className="text-sm text-slate-600">
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
            />
          ) : (
            <p className="text-sm text-slate-600">{user?.name || "N/A"}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Phone
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
            />
          ) : (
            <p className="text-sm text-slate-600">
              {user?.mobile || user?.phone || "N/A"}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
            />
          ) : (
            <p className="text-sm text-slate-600">{user?.email || "N/A"}</p>
          )}
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

// Orders Tab
const OrdersTab: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const { data, isLoading, refetch } = useGetMyOrdersQuery({});

  const orders = data?.data || [];

  const filteredOrders = orders.filter((order: Order) =>
    filter === "all" ? true : order.order_status === filter,
  );

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o: Order) => o.order_status === "pending").length,
    confirmed: orders.filter((o: Order) => o.order_status === "confirmed")
      .length,
    processing: orders.filter((o: Order) => o.order_status === "processing")
      .length,
    shipped: orders.filter((o: Order) => o.order_status === "shipped").length,
    delivered: orders.filter((o: Order) => o.order_status === "delivered")
      .length,
    cancelled: orders.filter((o: Order) => o.order_status === "cancelled")
      .length,
  };

  const statusFilters = [
    { id: "all", label: "All Orders", count: statusCounts.all },
    { id: "pending", label: "Pending", count: statusCounts.pending },
    { id: "confirmed", label: "Confirmed", count: statusCounts.confirmed },
    { id: "processing", label: "Processing", count: statusCounts.processing },
    { id: "shipped", label: "Shipped", count: statusCounts.shipped },
    { id: "delivered", label: "Delivered", count: statusCounts.delivered },
    { id: "cancelled", label: "Cancelled", count: statusCounts.cancelled },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="text-amber-500" />;
      case "confirmed":
        return <CheckCircle size={16} className="text-blue-500" />;
      case "processing":
        return <AlertCircle size={16} className="text-purple-500" />;
      case "shipped":
        return <Truck size={16} className="text-emerald-500" />;
      case "delivered":
        return <CheckCircle size={16} className="text-green-500" />;
      case "cancelled":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-purple-100 text-purple-700";
      case "shipped":
        return "bg-emerald-100 text-emerald-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">My Orders</h2>
        <button
          onClick={() => refetch()}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          Refresh
        </button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <button
            key={status.id}
            onClick={() => setFilter(status.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === status.id
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {status.label}
            <span className="ml-1 text-xs opacity-80">({status.count})</span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-sm text-slate-500 font-semibold">
            {orders.length === 0
              ? "No orders yet"
              : "No orders found with this status"}
          </p>
          {orders.length === 0 && (
            <Link
              href="/"
              className="inline-block mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
            >
              Start Shopping
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order: Order) => {
            const firstItem = order.items?.[0];
            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                    {firstItem?.product_name ? (
                      <div className="flex items-center justify-center w-full h-full bg-emerald-50 text-emerald-600 font-bold text-xs">
                        {firstItem.quantity}x
                      </div>
                    ) : (
                      <Package size={32} className="text-slate-300 m-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        #{order.order_number}
                      </p>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor(
                          order.order_status,
                        )}`}
                      >
                        {getStatusIcon(order.order_status)}
                        {order.order_status.charAt(0).toUpperCase() +
                          order.order_status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {order.items?.length || 0} items •{" "}
                      {order.placed_at
                        ? new Date(order.placed_at).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </p>
                    <p className="text-sm font-bold text-emerald-600">
                      ৳{Number(order.total_amount).toFixed(2)}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Wishlist Tab
const WishlistTab: React.FC = () => {
  const { data, isLoading, refetch } = useGetWishlistQuery({});
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const wishlistItems = data?.data || [];

  const handleRemove = async (id: string) => {
    try {
      await removeFromWishlist(id).unwrap();
      refetch();
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart({ productId, quantity: 1 }).unwrap();
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">Wishlist</h2>
        <button
          onClick={() => refetch()}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          Refresh
        </button>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <Heart size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-sm text-slate-500 font-semibold">
            Your wishlist is empty
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item: WishlistItem) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative aspect-square bg-slate-50">
                {item.product.images?.[0] ? (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Package size={48} className="text-slate-300" />
                  </div>
                )}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {item.product.name}
                </p>
                <p className="text-sm font-extrabold text-emerald-600">
                  ৳{Number(item.product.price).toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(item.product.id)}
                  className="w-full mt-2 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-lg transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Addresses Tab
const AddressesTab: React.FC = () => {
  const { data, isLoading, refetch } = useGetMyAddressesQuery({});
  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [showAddForm, setShowAddForm] = useState(false);

  const addresses = data?.data || [];

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(id).unwrap();
      refetch();
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await updateAddress({ id, is_default: true }).unwrap();
      refetch();
      toast.success("Default address updated!");
    } catch (error) {
      toast.error("Failed to update default address");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900">Addresses</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-sm text-slate-500 font-semibold">
            No addresses found. Add a new one below.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address: Address) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl p-4 border-2 transition-all ${
                address.is_default
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Home size={18} className="text-emerald-600" />
                  <p className="font-bold text-slate-800">
                    {address.full_name || "Address"}
                  </p>
                  {address.is_default && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  {!address.is_default && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <CheckCircle size={16} className="text-slate-400" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">{address.phone}</p>
              <p className="text-sm text-slate-500 mt-1">
                {address.address}
                {address.area && `, ${address.area}`}
                {address.city && `, ${address.city}`}
                {address.state && `, ${address.state}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Address Form - Simplified */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4">Add New Address</h3>
          <p className="text-sm text-slate-500 mb-4">
            Address form would go here. Connect to your address API.
          </p>
          <button
            onClick={() => setShowAddForm(false)}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

// Change Password Tab
const ChangePasswordTab: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();
      toast.success("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-slate-900">Change Password</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4 max-w-md"
      >
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              placeholder="Enter current password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  current: !showPassword.current,
                })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({ ...showPassword, new: !showPassword.new })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirm: !showPassword.confirm,
                })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          Change Password
        </button>
      </form>
    </div>
  );
};

// Main Account Page
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: profileData, isLoading, refetch } = useGetMyProfileQuery();

  const user = profileData?.data?.user;

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} refetch={refetch} />;
      case "orders":
        return <OrdersTab />;
      case "wishlist":
        return <WishlistTab />;
      case "addresses":
        return <AddressesTab />;
      case "password":
        return <ChangePasswordTab />;
      default:
        return <ProfileTab user={user} refetch={refetch} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              user={user}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
