const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  register: (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    [key: string]: any;
  }) => fetchAPI("/auth/register", { method: "POST", body: JSON.stringify(data) }),

  login: (email: string, password: string) =>
    fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => fetchAPI("/auth/me"),

  // Listings
  getListings: (params?: string) =>
    fetchAPI(`/listings${params ? `?${params}` : ""}`),

  getListing: (id: number) => fetchAPI(`/listings/${id}`),

  getMyListings: () => fetchAPI("/listings/my"),

  createListing: (data: any) =>
    fetchAPI("/listings", { method: "POST", body: JSON.stringify(data) }),

  updateListing: (id: number, data: any) =>
    fetchAPI(`/listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  uploadListingImage: (id: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetchAPI(`/listings/${id}/upload`, {
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  gradeListing: (id: number, imagePath: string) =>
    fetchAPI(`/listings/${id}/grade`, {
      method: "POST",
      body: JSON.stringify({ image_path: imagePath }),
    }),

  deleteListing: (id: number) =>
    fetchAPI(`/listings/${id}`, { method: "DELETE" }),

  // Bids
  placeBid: (listingId: number, data: any) =>
    fetchAPI(`/listings/${listingId}/bids`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getBids: (listingId: number) => fetchAPI(`/listings/${listingId}/bids`),

  getMyBids: () => fetchAPI("/bids/my"),

  acceptBid: (bidId: number) =>
    fetchAPI(`/bids/${bidId}/accept`, { method: "POST" }),

  rejectBid: (bidId: number) =>
    fetchAPI(`/bids/${bidId}/reject`, { method: "POST" }),

  // Transactions
  getTransactions: (params?: string) =>
    fetchAPI(`/transactions${params ? `?${params}` : ""}`),

  getTransaction: (id: number) => fetchAPI(`/transactions/${id}`),

  // Admin
  getAdminStats: () => fetchAPI("/admin/stats"),

  getAdminUsers: (params?: string) =>
    fetchAPI(`/admin/users${params ? `?${params}` : ""}`),

  getAdminTransactions: (params?: string) =>
    fetchAPI(`/admin/transactions${params ? `?${params}` : ""}`),
};
