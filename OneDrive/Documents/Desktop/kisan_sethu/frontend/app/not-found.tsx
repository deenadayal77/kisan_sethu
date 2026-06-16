import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-6">
          <div className="text-6xl font-bold text-primary">404</div>
          <h1 className="text-3xl font-bold text-text-primary">Page not found</h1>
          <p className="text-text-secondary max-w-md">
            Sorry, the page you're looking for doesn't exist. It might have been removed or
            the URL might be incorrect.
          </p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-primary text-white rounded-button font-semibold hover:bg-primary/90 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
