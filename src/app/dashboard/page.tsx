"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"; // Make sure to configure Firebase in this file

const JOHN = {
  name: "John Doe",
  email: "john.doe@example.com",
  treeIds: [],
};

const fetchUserData = async (userId: string) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(JOHN);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData("example").then((fetchedUserData) => {
      if (fetchedUserData) {
        setUserData(fetchedUserData);
        setLoading(false);
      }
    });
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
            {loading ? (
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
