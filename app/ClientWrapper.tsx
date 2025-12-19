"use client";

import Announcement from "@/components/announcement";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { useOnAuthStateChanged } from "@/lib/firebase/useOnAuthStateChanged";

interface LayoutProp {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: LayoutProp) {
  // Initialize Firebase auth listener on app start

  useOnAuthStateChanged();

  return (
    <div>
      <Provider store={store}>
        {/* <Announcement /> */}
        <Navbar />
        <main className="p-4">{children}</main>
        <Footer />
      </Provider>
    </div>
  );
}
