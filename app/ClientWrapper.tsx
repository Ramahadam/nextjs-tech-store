"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import AuthInitializer from "./AuthInitializer";

interface LayoutProp {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: LayoutProp) {
  return (
    <div>
      <Provider store={store}>
        <AuthInitializer />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Provider>
    </div>
  );
}
