import { Banknote, BarChart3, CreditCard, DollarSign, Package, ShoppingCart, Users, Wallet } from "lucide-react";

export const stats = [
  {
    title: "Total Sales",
    value: "84,373.50",
    trend: "+12.5%",
    isPositive: true,
    icon: <DollarSign size={24} />,
  },
  {
    title: "Total Purchase",
    value: "294,925.00",
    trend: "+8.2%",
    isPositive: true,
    icon: <ShoppingCart size={24} />,
  },
  {
    title: "Current Stock Value",
    value: "935,195.00",
    trend: "+15.3%",
    isPositive: true,
    icon: <Package size={24} />,
  },
  {
    title: "Total Customer Due",
    value: "53,536.00",
    trend: "-3.1%",
    isPositive: false,
    icon: <Users size={24} />,
  },
  {
    title: "Total Supplier Due",
    value: "0",
    trend: "0%",
    isPositive: true,
    icon: <CreditCard size={24} />,
  },
  {
    title: "Profit & Loss",
    value: "18,063.00",
    trend: "+5.7%",
    isPositive: true,
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Cash Balance",
    value: "130,338.50",
    trend: "+9.4%",
    isPositive: true,
    icon: <Wallet size={24} />,
  },
  {
    title: "Bank & Mobile Balance",
    value: "-314,800.00",
    trend: "-12.8%",
    isPositive: false,
    icon: <Banknote size={24} />,
  },
  {
    title: "Current Stock Saleable Value",
    value: "981,857.00",
    trend: "+18.2%",
    isPositive: true,
    icon: <Package size={24} />,
  },
];