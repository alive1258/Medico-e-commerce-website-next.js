import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/home/Dashboard";
import { Role } from "../redux/features/auth/role.enum";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "../pages/SignUp/SignUp";
import VerifyOtp from "../pages/Otp/VerifyOtp";
import AllCategories from "../pages/Category/AllCategories";
import AddCategory from "../pages/Category/AddCategory";
import EditCategory from "../pages/Category/EditCategory";

import AllUsers from "../pages/Users/AllUsers";

import AllWhoWeAre from "../pages/WhoWeAre/AllWhoWeAre";
import AddWhoWeAre from "../pages/WhoWeAre/AddWhoWeAre";
import EditWhoWeAre from "../pages/WhoWeAre/EditWhoWeAre";

import AllHeroSection from "../pages/home/HeroSection/AllHeroSection";
import AddHeroSection from "../pages/home/HeroSection/AddHeroSection";
import EditHeroSection from "../pages/home/HeroSection/EditHeroSection";

import AllTeams from "../pages/Teams/AllTeams";
import AddTeams from "../pages/Teams/AddTeams";
import EditTeams from "../pages/Teams/EditTeams";

// Products
import AllProducts from "../pages/Products/AllProducts";
import AddProduct from "../pages/Products/AddProduct";
import EditProduct from "../pages/Products/EditProduct";

// Audit Logs
import AllAuditLogs from "../pages/AuditLogs/AllAuditLogs";
import AuditLogDetails from "../pages/AuditLogs/AuditLogDetails";
import AllProductVariants from "../pages/ProductVariant/AllProductVariants";
import AddProductVariant from "../pages/ProductVariant/AddProductVariant";
import EditProductVariant from "../pages/ProductVariant/EditProductVariant";
import AllAddresses from "../pages/Address/AllAddresses";
import AddAddress from "../pages/Address/AddAddress";
import EditAddress from "../pages/Address/EditAddress";

// Roles allowed to access the app
const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // ===== CATEGORIES =====
      {
        path: "categories",
        element: <AllCategories />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
      },

      // ===== PRODUCTS =====
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },

      // ===== PRODUCT VARIANTS =====
      {
        path: "product-variants",
        element: <AllProductVariants />,
      },
      {
        path: "add-product-variant",
        element: <AddProductVariant />,
      },
      {
        path: "edit-product-variant/:id",
        element: <EditProductVariant />,
      },

      // ===== ADDRESSES =====
      {
        path: "addresses",
        element: <AllAddresses />,
      },
      {
        path: "add-address",
        element: <AddAddress />,
      },
      {
        path: "edit-address/:id",
        element: <EditAddress />,
      },

      // ===== AUDIT LOGS =====
      {
        path: "audit-logs",
        element: <AllAuditLogs />,
      },
      {
        path: "audit-log/:id",
        element: <AuditLogDetails />,
      },

      // ===== HERO SECTION =====
      {
        path: "home-hero",
        element: <AllHeroSection />,
      },
      {
        path: "add-home-hero",
        element: <AddHeroSection />,
      },
      {
        path: "edit-home-hero/:id",
        element: <EditHeroSection />,
      },

      // ===== WHO WE ARE =====
      {
        path: "who-we-are",
        element: <AllWhoWeAre />,
      },
      {
        path: "add-who-we-are",
        element: <AddWhoWeAre />,
      },
      {
        path: "edit-who-we-are/:id",
        element: <EditWhoWeAre />,
      },

      // ===== TEAMS =====
      {
        path: "teams",
        element: <AllTeams />,
      },
      {
        path: "add-teams",
        element: <AddTeams />,
      },
      {
        path: "edit-teams/:id",
        element: <EditTeams />,
      },

      // ===== USERS =====
      {
        path: "users",
        element: <AllUsers />,
      },
    ],
  },
  // ===== PUBLIC ROUTES =====
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "verify-otp",
    element: <VerifyOtp credential={null} />,
  },
  // Catch-all: redirect to login
  {
    path: "*",
    element: <Login />,
  },
]);
