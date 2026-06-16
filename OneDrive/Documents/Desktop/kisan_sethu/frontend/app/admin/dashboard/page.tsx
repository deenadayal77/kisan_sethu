"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { StatCard } from "@/components/dashboard/StatCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, Package, TrendingUp, DollarSign, Search } from "lucide-react";
import type { User } from "@/types";

interface AdminStats {
  total_users: number;
  total_listings: number;
  active_auctions: number;
  total_value: number;
}

interface Transaction {
  id: number;
  farmer_id: number;
  buyer_id: number;
  crop_name: string;
  quantity_kg: number;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        // Load stats
        const statsData = await api.getAdminStats();
        setStats(statsData);

        // Load users
        const usersData = await api.getAdminUsers();
        setUsers(usersData);

        // Load transactions
        const transData = await api.getAdminTransactions();
        setTransactions(transData);
      } catch (error) {
        console.error("Failed to load admin data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Mock chart data
  const chartData = [
    { name: "Mon", listings: 12, sales: 8 },
    { name: "Tue", listings: 19, sales: 11 },
    { name: "Wed", listings: 15, sales: 14 },
    { name: "Thu", listings: 21, sales: 18 },
    { name: "Fri", listings: 18, sales: 16 },
    { name: "Sat", listings: 14, sales: 12 },
    { name: "Sun", listings: 9, sales: 7 },
  ];

  const categoryData = [
    { name: "Fruits", value: 45 },
    { name: "Vegetables", value: 38 },
    { name: "Grains", value: 25 },
    { name: "Spices", value: 15 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
        <p className="text-text-secondary mt-1">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Users"
          value={stats?.total_users || 0}
          icon={<Users />}
        />
        <StatCard
          label="Total Listings"
          value={stats?.total_listings || 0}
          icon={<Package />}
        />
        <StatCard
          label="Active Auctions"
          value={stats?.active_auctions || 0}
          icon={<TrendingUp />}
        />
        <StatCard
          label="Total Transaction Value"
          value={`₹${(stats?.total_value || 0).toLocaleString("en-IN")}`}
          icon={<DollarSign />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Weekly Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#E2E8F0" />
              <XAxis stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="listings"
                stroke="#16A34A"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#F59E0B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Listings by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid stroke="#E2E8F0" />
              <XAxis stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip />
              <Bar dataKey="value" fill="#16A34A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface border border-border rounded-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Users ({filteredUsers.length})
        </h3>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-text-secondary" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-primary-light transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-text-primary">
                    {user.full_name}
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.is_active
                          ? "bg-success/10 text-success"
                          : "bg-gray-100 text-text-secondary"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {formatDate(user.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface border border-border rounded-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Recent Transactions ({transactions.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Crop
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Quantity
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 10).map((trans) => (
                <tr
                  key={trans.id}
                  className="border-b border-border hover:bg-primary-light transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-text-primary">
                    {trans.crop_name}
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {trans.quantity_kg} kg
                  </td>
                  <td className="py-3 px-4 font-mono text-text-primary">
                    {formatPrice(trans.total_amount)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success capitalize">
                      {trans.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {formatDate(trans.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
