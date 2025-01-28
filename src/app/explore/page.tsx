"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase"; // Ensure this is your Firebase configuration file
import Header from "@/components/Header";

const Explore = () => {
  const [trees, setTrees] = useState<{ [key: string]: any }>({});
  const [fade, setFade] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trees"));
        const treesData: { [key: string]: any } = {};
        querySnapshot.forEach((doc) => {
          treesData[doc.id] = doc.data();
        });
        setTrees(treesData);
      } catch (error) {
        console.error("Error fetching trees:", error);
      }
    };

    fetchTrees();
  }, []);

  const memoizedTrees = useMemo(() => {
    return Object.entries(trees).map(([id, tree]) => {
      const randomX = 20 + Math.random() * 60;
      const randomY = 20 + Math.random() * 60;
      const handleTreeClick = (id: string) => {
        // setTrees([]);
        setFade(true);
        setTimeout(() => {
          router.push(`/explore/${id}`);
        }, 500);
      };
      return (
        <motion.div
          key={id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleTreeClick(id)}
          className="z-2"
          style={{
            position: "absolute",
            top: `${randomY}%`,
            left: `${randomX}%`,
            width: "40px",
            height: "40px",
            backgroundColor: "#003300",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#005e00",
              borderRadius: "50%",
              margin: "auto",
              position: "relative",
              top: "10px",
            }}
          />
        </motion.div>
      );
    });
  }, [trees, router]);

  return (
    <div className="flex flex-col h-screen bg-blue-300 relative overflow-hidden">
      <Header className="text-white bg-blue-300 shadow-blue-300 " />
      <motion.div
        initial={{ y: fade ? 0 : "100vh" }}
        animate={{ y: fade ? "100vh" : 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 relative bg-green-700"
      >
        {memoizedTrees}
      </motion.div>
    </div>
  );
};

export default Explore;
