
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state
  if (status === "loading") return <p>Loading...</p>;

  // Redirect unauthenticated users
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link href="/dashboard" className="hover:underline">
            Home
          </Link>
          <Link href="/dashboard/add-product" className="hover:underline">
            Add Product
          </Link>
          <Link href="/dashboard/products" className="hover:underline">
            Products
          </Link>
          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-600 px-2 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
