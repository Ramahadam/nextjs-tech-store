"use client";

import Announcement from "@/components/announcement";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store";

interface LayoutProp {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: LayoutProp) {
  return (
    <div>
      <Provider store={store}>
        <Announcement />
        <Navbar />
        <main className="p-4">{children}</main>
        <Footer />
      </Provider>
    </div>
  );
}
