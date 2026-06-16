"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTable } from "@/components/dashboard/RecentTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { BarChart3, ListChecks, TrendingUp, Award, Plus } from "lucide-react";
import type { Listing } from "@/types";

interface DashboardStats {
  total_earnings: number;
  active_listings: number;
  completed_sales: number;
  average_grade: string;
}

export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        // In a real app, we'd have a dedicated stats endpoint
        // For now, we'll load listings and calculate stats
        const allListings = await api.getMyListings();
        setListings(allListings.slice(0, 5)); // Recent 5

        // Calculate stats from listings
        const active = allListings.filter((l: Listing) => l.status === "live").length;
        const sold = allListings.filter((l: Listing) => l.status === "sold").length;
        const earnings = allListings.reduce(
          (sum: number, l: Listing) =>
            sum + (l.min_price_per_kg ? l.min_price_per_kg * l.quantity_kg : 0),
          0
        );
        const grades = allListings
          .filter((l: Listing) => l.quality_grade)
          .map((l: Listing) => l.quality_score || 0);
        const avgGrade =
          grades.length > 0
            ? (grades.reduce((a: number, b: number) => a + b) / grades.length).toFixed(1)
            : "N/A";

        setStats({
          total_earnings: earnings,
          active_listings: active,
          completed_sales: sold,
          average_grade: avgGrade.toString(),
        });
      } catch (error) {
        console.error("Failed to load dashboard:", error);
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Farmer Dashboard</h1>
          <p className="text-text-secondary mt-1">Manage your listings and sales</p>
        </div>
        <Link
          href="/farmer/listings/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-button font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Create Listing
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Earnings"
          value={`₹${(stats?.total_earnings || 0).toLocaleString("en-IN")}`}
          icon={<TrendingUp />}
          trend="up"
        />
        <StatCard
          label="Active Listings"
          value={stats?.active_listings || 0}
          icon={<ListChecks />}
        />
        <StatCard
          label="Completed Sales"
          value={stats?.completed_sales || 0}
          icon={<BarChart3 />}
        />
        <StatCard
          label="Avg Quality Grade"
          value={stats?.average_grade || "N/A"}
          icon={<Award />}
        />
      </div>

      {/* Recent Listings */}
      <RecentTable listings={listings} title="Recent Listings" />
    </div>
  );
}
