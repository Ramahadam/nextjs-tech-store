"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import AuthInitializer from "./AuthInitializer";

interface LayoutProp {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: LayoutProp) {
  return (
    <div className="flex flex-col min-h-screen">
      <Provider store={store}>
        <AuthInitializer />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </Provider>
    </div>
  );
}
