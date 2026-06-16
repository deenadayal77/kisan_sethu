import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Leaf, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Fair prices. <span className="text-primary">Zero middlemen.</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Direct connection between farmers and buyers. Get better prices for your produce, discover fresh products at wholesale costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=farmer"
              className="px-8 py-4 bg-primary text-white rounded-button font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              I&apos;m a Farmer <ArrowRight size={20} />
            </Link>
            <Link
              href="/register?role=buyer"
              className="px-8 py-4 border-2 border-primary text-primary rounded-button font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
            >
              I&apos;m a Buyer <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-text-primary mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Upload & List
              </h3>
              <p className="text-text-secondary">
                Farmers upload fresh produce with photos. Buyers browse verified listings.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                AI Quality Check
              </h3>
              <p className="text-text-secondary">
                Gemini Vision AI grades produce quality automatically. Builds trust instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Bid & Trade
              </h3>
              <p className="text-text-secondary">
                Buyers bid on listings. Farmers accept best offers. Direct transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-surface border border-border rounded-card p-8 text-center shadow-card-sm">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-text-secondary">Farmers Connected</p>
            </div>
            <div className="bg-surface border border-border rounded-card p-8 text-center shadow-card-sm">
              <div className="text-4xl font-bold text-primary mb-2">₹2Cr+</div>
              <p className="text-text-secondary">Total Traded Value</p>
            </div>
            <div className="bg-surface border border-border rounded-card p-8 text-center shadow-card-sm">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <p className="text-text-secondary">Less Waste on Average</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary text-surface py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>&copy; 2024 Kisan Sethu. Empowering farmers, connecting communities.</p>
        </div>
      </footer>
    </div>
  );
}
