import Link from "next/link";
import { motion } from "framer-motion";
import { QualityBadge } from "./QualityBadge";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import type { Listing } from "@/types";

interface AnimatedListingCardProps {
  listing: Listing;
  delay?: number;
}

export function AnimatedListingCard({ listing, delay = 0 }: AnimatedListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link href={`/listing/${listing.id}`}>
        <div className="bg-surface border border-border rounded-card overflow-hidden shadow-card-sm hover:shadow-card-md transition-shadow duration-300 cursor-pointer h-full flex flex-col">
          {/* Image */}
          <motion.div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
            {listing.images && listing.images.length > 0 ? (
              <motion.img
                src={listing.images[0]}
                alt={listing.crop_name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary">
                No image
              </div>
            )}
            <motion.div
              className="absolute top-3 right-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, duration: 0.3 }}
            >
              <QualityBadge grade={listing.quality_grade} score={listing.quality_score || undefined} />
            </motion.div>
          </motion.div>

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
    </motion.div>
  );
}
