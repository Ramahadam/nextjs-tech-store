"use client";

import Announcement from "@/components/announcement";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface LayoutProp {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: LayoutProp) {
  return (
    <div>
      <Announcement />
      <Navbar />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
}
