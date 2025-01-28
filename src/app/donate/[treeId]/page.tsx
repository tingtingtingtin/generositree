"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Header from "@/components/Header";

const DonationPage = () => {
  const params = useParams();
  const router = useRouter();
  const treeId = params.treeId as string;

  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDonation = async () => {
    setLoading(true);
    setError(null);

    try {
      if (donationAmount <= 0) {
        throw new Error("Donation amount must be greater than 0.");
      }

      const donationData = {
        treeId,
        amount: donationAmount,
        donorName: isAnonymous ? "Anonymous" : name || "Anonymous",
        timestamp: new Date(),
      };

      const donationRef = await addDoc(
        collection(db, "donations"),
        donationData
      );

      const treeRef = doc(db, "trees", treeId);
      await updateDoc(treeRef, {
        donations: arrayUnion(donationRef.id),
      });

      router.push(`/thank-you`);
    } catch (error: any) {
      console.error("Error processing donation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-green-100 flex flex-col justify-between">
      <Header className="fixed top-0 left-0 w-full z-10" />
      <div className="bg-white shadow-lg rounded-md p-6 w-[50%] m-auto h-[50%]">
        <h2 className="text-xl font-bold text-center mb-4">
          Donate to Tree #{treeId}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="donationAmount"
            className="block text-sm font-medium mb-1"
          >
            Donation Amount ($)
          </label>
          <input
            type="number"
            id="donationAmount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isAnonymous}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="mr-2"
            />
            Donate Anonymously
          </label>
        </div>
        <button
          onClick={handleDonation}
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-bold rounded ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
          } transition duration-300`}
        >
          {loading ? "Processing..." : "Donate"}
        </button>
      </div>
    </div>
  );
};

export default DonationPage;
