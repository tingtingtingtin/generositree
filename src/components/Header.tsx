"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header({ className }: { className?: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }

        const data = await response.json();
        setUserId(data.userId);
      } catch (error) {
        setUserId(null);
      }
    };

    fetchUserId();
  }, []);

  return (
    <header
      className={`drop-shadow-sm ${className} flex items-center justify-between p-4`}
    >
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

        {userId ? (
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
                  router.push("/");
                  router.refresh();
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
