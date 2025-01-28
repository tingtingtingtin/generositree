"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "@/components/Header";
import Link from "next/link";
import TreeScene from "@/components/TreeScene";
import { formatDate } from "@/utils/util";

const NOW = new Date();

const TreeDetails = () => {
  const params = useParams();
  const treeId = params.treeId;

  const [tree, setTree] = useState<{
    timePlanted: number;
    imageId: string;
    caption: string;
    userId: string;
    donations?: Array<string>;
  } | null>(null);
  const [userName, setUserName] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [donationLoading, setDonationLoading] = useState(true);
  const [donations, setDonations] = useState<
    { amount: number; donorName: string; message: string }[]
  >([]);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const treeRef = doc(db, "trees", treeId);
        const treeSnapshot = await getDoc(treeRef);

        if (treeSnapshot.exists()) {
          const treeData = treeSnapshot.data();
          setTree(treeData);

          // Fetch user data
          const userRef = doc(db, "users", treeData.userId);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            setUserName(userSnapshot.data().name);
          }
        } else {
          console.error("Tree not found!");
        }
      } catch (error) {
        console.error("Error fetching tree data:", error);
      } finally {
        setImageLoading(false);
      }
    };
    fetchTreeData();
  }, [treeId]);

  useEffect(() => {
    const fetchDonations = async () => {
      if (tree?.donations) {
        try {
          const donationPromises = tree.donations.map((id) =>
            getDoc(doc(db, "donations", id))
          );
          const donationSnapshots = await Promise.all(donationPromises);

          const fetchedDonations = donationSnapshots
            .filter((snap) => snap.exists())
            .map((snap) => snap.data());

          setDonations(
            fetchedDonations.map((donation) => ({
              amount: donation.amount,
              donorName: donation.donorName || "Anonymous",
              message: donation.message || "",
            }))
          );
        } catch (error) {
          console.error("Error fetching donations:", error);
        } finally {
          setDonationLoading(false);
        }
      }
    };

    if (showImage) {
      fetchDonations();
    }
  }, [showImage, tree]);

  const handleTreeClick = () => {
    setShowImage(true);
  };

  return (
    <div className="w-full h-screen bg-blue-300 flex flex-col justify-center">
      <Header className="text-white fixed top-0 left-0 w-full z-10" />

      <div className="h-full w-full">
        <div className="flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="h-full w-full overflow-hidden"
          >
            <Link
              className="text-blue-100 fixed top-1/2 ml-8 z-40 text-4xl hover:text-white hover:scale-110 transition"
              href="/explore"
            >
              &larr; RETURN
            </Link>
            <TreeScene handleTreeClick={handleTreeClick} />
          </motion.div>
        </div>
        {showImage && tree && (
          <div
            onClick={() => setShowImage(false)}
            className="absolute overflow-hidden top-0 left-0 w-full h-full flex items-center justify-center z-2 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ opacity: 0, originY: -1 }}
              animate={{ opacity: 1, originY: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 justify-center items-center flex flex-row gap-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white shadow-black shadow-md w-72 p-4 h-[60%] flex flex-col align-center justify-center"
              >
                {imageLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <img
                      src={tree.imageId}
                      alt="Tree Image"
                      className="max-w-[100%] max-h-[100%] mx-auto p-2 rounded-sm"
                    />
                    <div className="flex text-sm flex-col">
                      <h2 className="m-auto mt-2 font-bold">{userName}</h2>
                      <p className="m-auto mt-2">{tree.caption}</p>
                      <h3 className="text-gray-400 mt-2">
                        {formatDate(tree.timePlanted)}
                      </h3>
                    </div>
                  </>
                )}
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="p-4 h-[60%] w-72 bg-gray-100 flex flex-col"
              >
                {donationLoading ? (
                  <p>Loading</p>
                ) : (
                  <div className="h-full flex flex-col">
                    <h3 className="m-auto mt-0 text-center font-bold text-lg mb-2">
                      Donations
                    </h3>
                    <div className="overflow-y-auto">
                      {donations.map((donation, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-300 pb-2 mb-2"
                        >
                          <p className="font-bold">{donation.donorName}</p>
                          <p>${donation.amount.toFixed(2)}</p>
                          <p>{donation.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-row ">
                  <p className="mt-auto">Inspired?</p>
                  <Link
                    className="px-2 py-0.5 rounded-md border border-black mb-0 mt-auto mr-2 ml-auto"
                    href={`/donate/${treeId}`}
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeDetails;
