"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ListingCard } from "@/components/listing/ListingCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/common/EmptyState";
import { Search, Filter } from "lucide-react";
import type { Listing } from "@/types";

const CATEGORIES = ["All", "fruit", "vegetable", "grain", "spice"];
const GRADES = ["All", "A+", "A", "B", "C"];

export default function BuyerDashboard() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    async function loadListings() {
      try {
        const data = await api.getListings();
        const liveListings = data.filter((l: Listing) => l.status === "live");
        setListings(liveListings);
        applyFilters(liveListings);
      } catch (error) {
        console.error("Failed to load listings:", error);
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const applyFilters = (items: Listing[]) => {
    let filtered = items;

    // Search
    if (search) {
      filtered = filtered.filter(
        (l) =>
          l.crop_name.toLowerCase().includes(search.toLowerCase()) ||
          l.location?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((l) => l.crop_category === selectedCategory);
    }

    // Grade
    if (selectedGrade !== "All") {
      filtered = filtered.filter((l) => l.quality_grade === selectedGrade);
    }

    // Price
    filtered = filtered.filter(
      (l) =>
        l.min_price_per_kg &&
        l.min_price_per_kg >= priceRange.min &&
        l.min_price_per_kg <= priceRange.max
    );

    setFilteredListings(filtered);
  };

  useEffect(() => {
    applyFilters(listings);
  }, [search, selectedCategory, selectedGrade, priceRange]);

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
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Marketplace</h1>
        <p className="text-text-secondary mt-1">
          Browse fresh produce from verified farmers
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search crops, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {/* Category */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text-primary hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grade */}
          <div className="flex gap-2 flex-wrap ml-auto">
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              Grade:
            </label>
            {GRADES.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedGrade === grade
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text-primary hover:bg-gray-200"
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-surface border border-border rounded-card p-4">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Price Range (₹/kg)
          </label>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-xs text-text-secondary mb-1">Min</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className="w-24 px-3 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-text-secondary mb-1">Max</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className="w-24 px-3 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setPriceRange({ min: 0, max: 10000 })}
              className="text-primary text-sm font-medium hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-text-secondary">
        Found {filteredListings.length} listings
      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🌾"
          title="No listings found"
          description="Try adjusting your filters to find more listings"
        />
      )}
    </div>
  );
}
