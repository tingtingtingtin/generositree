"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "@/components/Header";

const TreeModel = ({ onClick }) => (
  <mesh>
    <mesh onClick={onClick}>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.9, 2, 32]} />
        <mesh position={[0.2, 0, 0.5]} rotation={[0, Math.PI / 6, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.2, 0, 0.5]} rotation={[0, Math.PI / 6, 0]}>
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
  } | null>(null);
  const [userName, setUserName] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Invalid Date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        // Fetch tree data
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
      <div className="h-full pt-16 w-full">
        {tree && (
          <>
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
              className="h-full w-full"
            >
              <Canvas>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 4, 5]} intensity={1} />
                <TreeModel onClick={handleTreeClick} />
              </Canvas>
            </motion.div>
          </>
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
            >
              <div className="bg-white shadow-black shadow-md w-72 p-1 pb-20 pt-5 flex flex-col align-center justify-center">
                <h2 className="m-auto mt-2 font-bold">{userName}</h2>
                <img
                  src={tree.imageId}
                  alt="Tree"
                  className="max-w-[80%] max-h-[80%] m-auto rounded-sm"
                />
                <p className="m-auto mt-2">{tree.caption}</p>
                <h3 className="m-auto mt-2">{formatDate(tree.timePlanted)}</h3>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeDetails;
