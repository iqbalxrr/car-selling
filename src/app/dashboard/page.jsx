"use client";

import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardHome() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <Spinner />;
      
  if (!session) return null;

  const salesData = [
    { month: "Jan", sales: 400, profit: 240 },
    { month: "Feb", sales: 300, profit: 139 },
    { month: "Mar", sales: 500, profit: 280 },
    { month: "Apr", sales: 450, profit: 200 },
    { month: "May", sales: 600, profit: 300 },
    { month: "Jun", sales: 700, profit: 400 },
  ];

  return (
    <div className="sm:p-6 space-y-6">
      {/* Welcome Gradient Card */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome, {session.user?.name || session.user?.email}
        </h1>
        <p className="text-sm sm:text-base">
          🚀 Glad to have you back! Here’s your latest dashboard insights at a
          glance.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-3">📊 Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-3">📈 Profit Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
