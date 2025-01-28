"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase"; // Ensure this is your Firebase configuration file
import Header from "@/components/Header";

const Explore = () => {
  const [trees, setTrees] = useState<{ [key: string]: any }>({});
  // const [activeTree, setActiveTree] = useState<string | null>(null);
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

  const handleTreeClick = (id: string) => {
    // setActiveTree(id);
    // setTimeout(() => {
    setFade(true);
    // }, 0);
    setTimeout(() => {
      router.push(`/explore/${id}`);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-green-700 relative">
      <Header className="text-white bg-blue-300 shadow-lg shadow-blue-300" />
      {fade ? (
        <motion.div
          className="h-full w-full bg-blue-300 shadow-lg shadow-blue-300"
          initial={{ height: "0vh" }}
          animate={{ height: "100vh" }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        Object.entries(trees).map(([id, tree]) => {
          const randomX = 20 + Math.random() * 60;
          const randomY = 20 + Math.random() * 60;

          return (
            <motion.div
              key={id}
              initial={{ scale: 1 }}
              transition={{ duration: 1 }}
              onClick={() => handleTreeClick(id)}
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
        })
      )}
    </div>
  );
};

export default Explore;
