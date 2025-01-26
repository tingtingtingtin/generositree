"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"; // Make sure to configure Firebase in this file

interface UserData {
  name: string;
  email: string;
  treeIds: string[];
}

const fetchUserData = async (userId: string): Promise<UserData | null> => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data() as UserData;
  } else {
    console.log("No such document!");
    return null;
  }
};

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData(userId).then((fetchedUserData) => {
        if (fetchedUserData) {
          setUserData(fetchedUserData);
        }
      });
    } else {
      console.log("No user ID found in local storage");
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex flex-col relative min-h-screen w-full bg-green-100 overflow-hidden">
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
            {!userData ? (
              <h2 className="text-center">Loading...</h2>
            ) : (
              <div className="mt-4">
                <p className="text-lg text-gray-600">
                  <strong>Name:</strong> {userData.name}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Trees Planted:</strong> {userData.treeIds.length}
                </p>
              </div>
            )}
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
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
