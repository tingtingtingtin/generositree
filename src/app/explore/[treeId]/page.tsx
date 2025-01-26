"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "@/components/Header";
import Link from "next/link";

const TreeModel = ({ onClick }: { onClick: () => void }) => (
  <mesh>
    <mesh onClick={onClick}>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.9, 2, 32]} />
        <mesh position={[0.2, 0, 0.5]} rotation={[0, Math.PI / 6, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.2, 0, 0.6]} rotation={[0, Math.PI / 6, 0]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <meshStandardMaterial color="green" />
      </mesh>
      <coneGeometry args={[1, 2, 32]} />
      <meshStandardMaterial color="green" />
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
        <meshStandardMaterial color="brown" />
      </mesh>
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -1]}>
      <circleGeometry args={[30, 30]} />
      <meshBasicMaterial color="#15803d" />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.2, -2, 0]}>
      <circleGeometry args={[0.8, 32]} />
      <meshBasicMaterial color="black" opacity={0.3} transparent />
    </mesh>
  </mesh>
);

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
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<
    { amount: number; donorName: string; message: string }[]
  >([]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Invalid Date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

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
        setLoading(false);
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
        }
      }
    };

    if (showImage) {
      fetchDonations();
    }
  }, [showImage, tree]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const handleTreeClick = () => {
    setShowImage(true);
  };

  return (
    <div className="w-full h-screen bg-blue-300 flex flex-col justify-center">
      <Header className="fixed top-0 left-0 w-full z-10" />
      <div className="h-full w-full">
        {tree && (
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-4 left-4 z-20 text-white text-xl font-bold"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="h-full w-full overflow-hidden"
            >
              <Canvas>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 4, 5]} intensity={1} />
                <TreeModel onClick={handleTreeClick} />
              </Canvas>
            </motion.div>
          </div>
        )}
        {showImage && tree && (
          <div
            onClick={() => setShowImage(false)}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="bg-white shadow-black shadow-md w-72 p-4 pb-10 flex flex-col align-center justify-center">
                <img
                  src={tree.imageId}
                  alt="Tree Image"
                  className="max-w-[100%] max-h-[100%] m-auto rounded-sm"
                />
                <h2 className="m-auto mt-2 font-bold">{userName}</h2>
                <p className="m-auto mt-2">{tree.caption}</p>
                <h3 className="m-auto mt-2">{formatDate(tree.timePlanted)}</h3>
              </div>
              <Link
                href={`/donate/${treeId}`}
                className="mt-2 px-4 py-2 bg-green-500 m-auto text-white rounded hover:bg-green-700 transition duration-300"
              >
                Support a tree-planting cause
              </Link>
              <div className="mt-6 p-4 bg-white rounded-md overflow-y-auto">
                <h3 className="m-auto text-center font-bold text-lg mb-2">
                  Donations
                </h3>
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
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeDetails;
