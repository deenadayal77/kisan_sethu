import Link from "next/link";
import { QualityBadge } from "@/components/listing/QualityBadge";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Listing } from "@/types";

interface RecentTableProps {
  listings: Listing[];
  title: string;
}

export function RecentTable({ listings, title }: RecentTableProps) {
  return (
    <div className="bg-surface border border-border rounded-card p-6 shadow-card-sm">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>

      {listings.length === 0 ? (
        <p className="text-text-secondary text-center py-8">No listings yet</p>
      ) : (
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
                  Grade
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">
                  Price
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
              {listings.map((listing) => (
                <tr
                  key={listing.id}
                  className="border-b border-border hover:bg-primary-light transition-colors"
                >
                  <td className="py-3 px-4">
                    <Link
                      href={`/listing/${listing.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {listing.crop_name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {listing.quantity_kg} kg
                  </td>
                  <td className="py-3 px-4">
                    <QualityBadge grade={listing.quality_grade} />
                  </td>
                  <td className="py-3 px-4 font-mono text-text-primary">
                    {listing.min_price_per_kg ? formatPrice(listing.min_price_per_kg) : "—"}/kg
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        listing.status === "live"
                          ? "bg-success/10 text-success"
                          : listing.status === "sold"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100 text-text-secondary"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {formatDate(listing.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
