"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiHome, FiPlusCircle, FiBox, FiLogOut } from "react-icons/fi";
import { FaBackward } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Loading state
  if (status === "loading") return <p>Loading...</p>;

  // Redirect unauthenticated users
  if (!session) {
    router.push("/login");
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/dashboard", icon: <FiHome /> },
    { name: "Add Product", href: "/dashboard/add-product", icon: <FiPlusCircle /> },
    { name: "Products", href: "/dashboard/products", icon: <FiBox /> },
    { name: "Back to Home", href: "/", icon: <FaBackward /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && <h2 className="text-xl font-bold">Dashboard</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            <FiMenu />
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
            >
              <span className="text-xl">{link.icon}</span>
              {sidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}

          <button
            onClick={() => signOut()}
            className="mt-auto flex items-center gap-3 p-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
          >
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-2  overflow-auto">{children}</main>
    </div>
  );
}
