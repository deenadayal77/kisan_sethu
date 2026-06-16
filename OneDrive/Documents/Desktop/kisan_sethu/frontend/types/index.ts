export type UserRole = "farmer" | "buyer" | "admin";

export interface User {
  id: number;
  role: UserRole;
  full_name: string;
  email: string;
  phone: string | null;
  village: string | null;
  district: string | null;
  state: string;
  farm_size_acres: number | null;
  business_name: string | null;
  business_type: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Listing {
  id: number;
  farmer_id: number;
  crop_name: string;
  crop_category: string;
  variety: string | null;
  quantity_kg: number;
  min_price_per_kg: number | null;
  description: string | null;
  harvest_date: string | null;
  location: string | null;
  images: string[];
  quality_grade: string | null;
  quality_score: number | null;
  shelf_life_days: number | null;
  quality_notes: string | null;
  status: "draft" | "live" | "sold" | "expired" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface Bid {
  id: number;
  listing_id: number;
  buyer_id: number;
  price_per_kg: number;
  total_amount: number;
  message: string | null;
  status: "active" | "accepted" | "rejected" | "withdrawn";
  created_at: string;
}

export interface Transaction {
  id: number;
  listing_id: number;
  bid_id: number;
  farmer_id: number;
  buyer_id: number;
  crop_name: string;
  quantity_kg: number;
  price_per_kg: number;
  total_amount: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
}

export interface QualityGrade {
  grade: "A+" | "A" | "B" | "C";
  score: number;
  shelf_life_days: number;
  notes: string;
  defects: string[];
}
