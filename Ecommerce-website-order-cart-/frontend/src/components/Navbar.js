"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getWishlistCount } from "@/utils/api";

export default function Navbar() {
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const updateUserData = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      setIsLoggedIn(!!token);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.name || "User");
          setUserRole(user.role || "user");
        } catch (e) {
          setUserName("User");
          setUserRole("user");
        }
      }

      if (token) {
        getWishlistCount()
          .then((res) => setWishlistCount(res.data.data.count))
          .catch(() => {});
      }
    };

    updateUserData();

    // Listen for storage changes (when user logs in on another tab or in same tab)
    const handleStorageChange = () => {
      updateUserData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-black text-orange-500 tracking-tighter">
            OrderCard
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                /* FIX: Added !text-black and !bg-white to ensure visibility */
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 !text-black !bg-white placeholder-gray-400"
                style={{ color: "black", backgroundColor: "white" }}
              />
              <button
                type="submit"
                className="px-6 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 font-bold transition-colors">
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="relative group">
                  <button className="text-sm text-gray-600 hover:text-orange-500 font-semibold">
                    Hello, {userName}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-50">
                    <Link
                      href={userRole === "admin" ? "/admin" : "/dashboard"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">
                      {userRole === "admin" ? "Admin Panel" : "My Dashboard"}
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-orange-500 font-semibold">
                Login
              </Link>
            )}

            {isLoggedIn && (
              <>
                <Link
                  href="/orders"
                  className="text-sm text-gray-600 hover:text-orange-500 font-semibold">
                  My Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="relative flex items-center text-2xl">
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            <Link href="/cart" className="relative flex items-center">
              <span className="ml-1 text-sm">Cart ({itemCount})</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-6 py-2 text-sm">
          <Link
            href="/search"
            className="text-gray-600 hover:text-orange-500 font-semibold">
            Search
          </Link>
          <Link
            href="/categories"
            className="text-gray-600 hover:text-orange-500">
            Categories
          </Link>
          <Link href="/deals" className="text-gray-600 hover:text-orange-500">
            Deals
          </Link>
          <Link
            href="/customer-service"
            className="text-gray-600 hover:text-orange-500">
            Support
          </Link>
        </div>
      </div>
    </nav>
  );
}
