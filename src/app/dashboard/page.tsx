"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    treesPlanted: 5,
  });

  const router = useRouter();

  useEffect(() => {
    // You can replace this with a real API call to fetch user data
    // Example: setUserData(fetchedUserData);
  }, []);

  return (
    <div className="relative min-h-screen bg-green-100 overflow-hidden">
      <Header />

      {/* Dashboard Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Dashboard</h2>

          {/* User Info Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              User Information
            </h3>
            <div className="mt-4">
              <p className="text-lg text-gray-600">
                <strong>Name:</strong> {userData.name}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Trees Planted:</strong> {userData.treesPlanted}
              </p>
            </div>
          </div>

          {/* Action Button Section */}
          <div className="mt-6 flex justify-between space-x-4">
            <button
              onClick={() => router.push("/plant")}
              className="rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600"
            >
              Plant More Trees
            </button>
            <button
              onClick={() => router.push("/account")}
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
            >
              Edit Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
