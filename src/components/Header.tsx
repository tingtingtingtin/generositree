"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header({ className }: { className: string }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <header className={`${className} flex items-center justify-between p-4`}>
      {/* Left Button */}
      <Link href="/">Home</Link>

      {/* Right Links */}
      <div className="flex space-x-6">
        <Link href="/dashboard" className="hover:text-gray-200">
          Dashboard
        </Link>
        <Link href="/explore" className="hover:text-gray-200">
          Explore
        </Link>
        <Link href="/about" className="hover:text-gray-200">
          About
        </Link>
        <Link href="/plant" className="hover:text-gray-200">
          Plant a Tree
        </Link>

        {isAuthenticated ? (
          <>
            <button
              onClick={async () => {
                try {
                  const response = await fetch("/api/auth/logout", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                  }

                  console.log("Logged out successfully");
                  // localStorage.removeItem("userId");
                  router.push("/");
                  // Redirect to login page or home page after successful logout
                } catch (error: any) {
                  console.error("Logout failed:", error.message);
                }
              }}
              className="hover:text-gray-200"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:text-gray-200">
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
