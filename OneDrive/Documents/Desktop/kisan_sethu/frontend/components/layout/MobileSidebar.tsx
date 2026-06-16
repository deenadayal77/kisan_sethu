"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  List,
  Plus,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!user) return null;

  const isFarmer = user.role === "farmer";
  const isBuyer = user.role === "buyer";

  const navItems = [
    {
      label: "Dashboard",
      href: `/${user.role}/dashboard`,
      icon: LayoutDashboard,
      show: true,
    },
    {
      label: "My Listings",
      href: "/farmer/listings",
      icon: List,
      show: isFarmer,
    },
    {
      label: "Create Listing",
      href: "/farmer/listings/new",
      icon: Plus,
      show: isFarmer,
    },
    {
      label: "Marketplace",
      href: "/buyer/dashboard",
      icon: ShoppingCart,
      show: isBuyer,
    },
    {
      label: "My Bids",
      href: "/buyer/bids",
      icon: ShoppingCart,
      show: isBuyer,
    },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-screen w-60 bg-surface border-r border-border z-40 overflow-y-auto"
            >
              <div className="p-6">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    KS
                  </div>
                  <span className="font-bold text-lg">Kisan Sethu</span>
                </Link>
              </div>

              <nav className="px-4 py-6 space-y-1">
                {navItems.map((item) => {
                  if (!item.show) return null;
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "text-text-primary hover:bg-gray-100"
                      )}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-6 left-4 right-4 space-y-2">
                <div className="px-4 py-3 bg-primary-light rounded-lg">
                  <p className="text-sm font-medium text-text-primary">
                    {user.full_name}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
