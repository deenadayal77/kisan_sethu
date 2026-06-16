"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Menu } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              KS
            </div>
            <span className="font-semibold text-lg hidden sm:inline">Kisan Sethu</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <span className="text-xs sm:text-sm text-text-secondary hidden sm:inline">
                  {user.full_name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-2 sm:px-3 py-2 text-sm text-text-primary hover:bg-primary/10 rounded-lg transition-colors min-h-[44px] min-w-[44px] justify-center sm:justify-start"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors px-2 sm:px-4 py-2 rounded-lg hover:bg-primary/10 min-h-[44px] flex items-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-xs sm:text-sm px-3 sm:px-4 py-2 bg-primary text-white rounded-button hover:bg-primary/90 transition-colors min-h-[44px] flex items-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
