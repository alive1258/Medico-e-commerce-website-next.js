"use client";
import { store } from "@/src/redux/store";
import React from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
