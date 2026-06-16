"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { QualityBadge } from "@/components/listing/QualityBadge";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Navbar } from "@/components/layout/Navbar";
import { formatDate, formatPrice } from "@/lib/utils";
import { Heart, MapPin, Calendar, Zap } from "lucide-react";
import type { Listing, Bid } from "@/types";

export default function ListingDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const listingId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<Listing | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [placingBid, setPlacingBid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const listingData = await api.getListing(listingId);
        setListing(listingData);

        const bidsData = await api.getBids(listingId);
        setBids(bidsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load listing");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [listingId]);

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPlacingBid(true);

    try {
      await api.placeBid(listingId, {
        price_per_kg: parseFloat(bidAmount),
        total_amount: parseFloat(bidAmount) * (listing?.quantity_kg || 0),
        message: bidMessage,
      });

      // Reload bids
      const bidsData = await api.getBids(listingId);
      setBids(bidsData);

      // Clear form
      setBidAmount("");
      setBidMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place bid");
    } finally {
      setPlacingBid(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="text-center py-12">
          <p className="text-text-secondary">Listing not found</p>
        </div>
      </div>
    );
  }

  const isFarmer = user?.id === listing.farmer_id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Quality */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-surface border border-border rounded-card overflow-hidden">
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[0]}
                  alt={listing.crop_name}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-text-secondary">
                  No image available
                </div>
              )}
            </div>

            {/* Quality Report */}
            {listing.quality_grade && (
              <div className="bg-surface border border-border rounded-card p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Quality Report
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">Grade</p>
                      <QualityBadge
                        grade={listing.quality_grade}
                        score={listing.quality_score || undefined}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">Score</p>
                      <p className="text-2xl font-bold text-primary">
                        {listing.quality_score || "—"}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary mb-1">
                        Shelf Life
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {listing.shelf_life_days || "—"} days
                      </p>
                    </div>
                  </div>

                  {listing.quality_notes && (
                    <div className="bg-primary-light rounded-lg p-4">
                      <p className="text-sm italic text-text-primary">
                        "{listing.quality_notes}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info & Bidding */}
          <div className="space-y-6">
            {/* Listing Info */}
            <div className="bg-surface border border-border rounded-card p-6">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {listing.crop_name}
              </h1>
              {listing.variety && (
                <p className="text-text-secondary mb-4">{listing.variety}</p>
              )}

              <div className="space-y-3 mb-6">
                {listing.location && (
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin size={18} />
                    <span>{listing.location}</span>
                  </div>
                )}
                {listing.harvest_date && (
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar size={18} />
                    <span>{formatDate(listing.harvest_date)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-text-secondary mb-1">Available Quantity</p>
                <p className="text-2xl font-bold text-text-primary mb-4">
                  {listing.quantity_kg} kg
                </p>

                <p className="text-sm text-text-secondary mb-1">
                  Minimum Price
                </p>
                <p className="text-3xl font-bold text-primary">
                  {listing.min_price_per_kg
                    ? formatPrice(listing.min_price_per_kg)
                    : "—"}
                  <span className="text-lg text-text-secondary">/kg</span>
                </p>
              </div>
            </div>

            {/* Place Bid Form */}
            {!isFarmer && user?.role === "buyer" && (
              <div className="bg-surface border border-border rounded-card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Place Your Bid
                </h3>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handlePlaceBid} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Price per kg (₹) *
                    </label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      step="0.1"
                      min={listing.min_price_per_kg || 0}
                      className="w-full px-3 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your bid"
                    />
                  </div>

                  {bidAmount && (
                    <div className="bg-primary-light p-3 rounded-lg">
                      <p className="text-xs text-text-secondary">
                        Total Amount
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(
                          parseFloat(bidAmount) * listing.quantity_kg
                        )}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Send a message to the farmer..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={placingBid || !bidAmount}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-button font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {placingBid ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Placing bid...
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        Place Bid
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Bids List */}
            <div className="bg-surface border border-border rounded-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Current Bids ({bids.length})
              </h3>

              {bids.length === 0 ? (
                <p className="text-text-secondary text-sm text-center py-4">
                  No bids yet
                </p>
              ) : (
                <div className="space-y-3">
                  {bids
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    .slice(0, 5)
                    .map((bid) => (
                      <div key={bid.id} className="border-b border-border pb-3 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-text-primary">
                              {formatPrice(bid.price_per_kg)}/kg
                            </p>
                            <p className="text-xs text-text-secondary">
                              Total: {formatPrice(bid.total_amount)}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              bid.status === "active"
                                ? "bg-success/10 text-success"
                                : "bg-gray-100 text-text-secondary"
                            }`}
                          >
                            {bid.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
