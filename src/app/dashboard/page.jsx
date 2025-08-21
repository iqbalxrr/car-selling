"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardHome() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null; // already handled in layout

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.email}</h1>
      <p className="mb-8 text-gray-700">
        Here's a quick overview of your dashboard. Manage products, view stats, and more.
      </p>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/add-product"
          className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700"
        >
          <h2 className="text-xl font-bold mb-2">Add Product</h2>
          <p>Create a new product and add it to your store.</p>
        </Link>

        <Link
          href="/dashboard/products"
          className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700"
        >
          <h2 className="text-xl font-bold mb-2">View Products</h2>
          <p>See all your listed products and manage them.</p>
        </Link>

        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Stats</h2>
          <p>Check recent activity, sales stats, and insights.</p>
        </div>
      </div>
    </div>
  );
}
