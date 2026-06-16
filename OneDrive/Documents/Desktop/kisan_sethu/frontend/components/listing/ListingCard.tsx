import Link from "next/link";
import { QualityBadge } from "./QualityBadge";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="bg-surface border border-border rounded-card overflow-hidden shadow-card-sm hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.crop_name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary">
              No image
            </div>
          )}
          <div className="absolute top-3 right-3">
            <QualityBadge grade={listing.quality_grade} score={listing.quality_score || undefined} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg text-text-primary">
            {listing.crop_name}
          </h3>
          {listing.variety && (
            <p className="text-sm text-text-secondary">{listing.variety}</p>
          )}

          <p className="text-xs text-text-secondary mt-2">
            {listing.location || "Location not specified"}
          </p>

          <div className="flex items-center gap-1 mt-2">
            <Star size={14} className="text-accent fill-accent" />
            <span className="text-xs text-text-secondary">Market Price</span>
          </div>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-text-secondary">Price per kg</p>
                <p className="font-mono font-bold text-lg text-primary">
                  {listing.min_price_per_kg ? formatPrice(listing.min_price_per_kg) : "—"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary">Available</p>
                <p className="font-semibold text-text-primary">
                  {listing.quantity_kg} kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
