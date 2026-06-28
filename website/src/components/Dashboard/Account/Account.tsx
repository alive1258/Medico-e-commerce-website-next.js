/* eslint-disable @typescript-eslint/no-explicit-any */
// app/account/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Types
interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  items: number;
  image: string;
  name: string;
}

// Components
const Sidebar: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ activeTab, onTabChange }) => {
  const user = {
    name: "Zamirul Kabir",
    email: "zamirulkabir999@gmail.com",
    avatar: "",
  };

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "password", label: "Change Password", icon: Lock },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-6">
      {/* User Info */}
      <div className="text-center pb-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto mb-3 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={80}
              height={80}
              className="object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-emerald-600">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <h3 className="font-bold text-slate-900">{user.name}</h3>
        <p className="text-xs text-slate-500">{user.email}</p>
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
          onClick={() => {
            toast.success("Logged out successfully!");
          }}
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
const ProfileTab: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Zamirul Kabir",
    phone: "01XXXXXXXXX",
    email: "zamirulkabir999@gmail.com",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Member Info */}
      <div className="bg-emerald-50 rounded-2xl p-4 flex items-center gap-4">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Calendar size={20} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-700">Member since</p>
          <p className="text-sm text-slate-600">June 2026</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
            />
          ) : (
            <p className="text-sm text-slate-600">{formData.fullName}</p>
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
            <p className="text-sm text-slate-600">{formData.phone}</p>
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
            <p className="text-sm text-slate-600">{formData.email}</p>
          )}
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
          >
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

  const orders: Order[] = [
    // Mock orders - will come from API
  ];

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-slate-900">My Orders</h2>

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
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-sm text-slate-500 font-semibold">
            No orders found
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                  <Image
                    src={order.image}
                    alt={order.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800 truncate">
                      {order.name}
                    </p>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {order.items} items • {order.date}
                  </p>
                  <p className="text-sm font-bold text-emerald-600">
                    ৳{order.total.toFixed(2)}
                  </p>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Wishlist Tab
const WishlistTab: React.FC = () => {
  const wishlistItems: any[] = []; // Mock wishlist

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-slate-900">Wishlist</h2>

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
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {item.name}
                </p>
                <p className="text-sm font-extrabold text-emerald-600">
                  ৳{item.price}
                </p>
                <button className="w-full mt-2 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-lg transition-all">
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
  const [addresses, setAddresses] = useState<Address[]>([
    // Mock addresses
    // {
    //   id: "1",
    //   label: "Home",
    //   fullName: "Zamirul Kabir",
    //   phone: "01XXXXXXXXX",
    //   address: "House #123, Road #45",
    //   city: "Dhaka",
    //   area: "Bashundhara R/A",
    //   isDefault: true,
    // },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success("Address deleted successfully!");
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
    toast.success("Default address updated!");
  };

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
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl p-4 border-2 transition-all ${
                address.isDefault
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {address.label === "Home" ? (
                    <Home size={18} className="text-emerald-600" />
                  ) : (
                    <Building size={18} className="text-emerald-600" />
                  )}
                  <p className="font-bold text-slate-800">{address.label}</p>
                  {address.isDefault && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <CheckCircle size={16} className="text-slate-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-700 mt-2">
                {address.fullName}
              </p>
              <p className="text-sm text-slate-500">{address.phone}</p>
              <p className="text-sm text-slate-500 mt-1">
                {address.address}, {address.area}, {address.city}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Address Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-4">Add New Address</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Label
                </label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all">
                  <option>Home</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="House #123, Road #45"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Area
                </label>
                <input
                  type="text"
                  placeholder="Bashundhara R/A"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Dhaka"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all">
                Save Address
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
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
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
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
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

// Main Account Page
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrdersTab />;
      case "wishlist":
        return <WishlistTab />;
      case "addresses":
        return <AddressesTab />;
      case "password":
        return <ChangePasswordTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
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
