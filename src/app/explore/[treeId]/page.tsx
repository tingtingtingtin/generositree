"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

const treeData = {
  tree1: { model: "Tree1Model", caption: "Example caption" },
  tree2: { model: "Tree2Model", caption: "Second tree caption" },
  tree3: { model: "Tree3Model", caption: "Third tree caption" },
};

// Dummy 3D Tree Model
const TreeModel = () => (
  <mesh>
    <mesh position={[0, 0.8, 0]}>
      <coneGeometry args={[0.8, 2, 32]} />
      <meshStandardMaterial color="green" />
    </mesh>
    <coneGeometry args={[0.9, 2, 32]} />
    <meshStandardMaterial color="green" />
    <mesh position={[0, -1, 0]}>
      <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
      <meshStandardMaterial color="brown" />
    </mesh>
  </mesh>
);

const TreeDetails = () => {
  const params = useParams();
  const treeId = params.treeId;
  const tree = treeData[treeId];

  // const showTree = true;
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    // Simulate a delay to show the animation
    const timeout = setTimeout(() => setShowTree(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen w-screen bg-green-200 flex items-center justify-center">
      {/* <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-10 text-center"
      >
        <h1 className="text-4xl font-bold text-green-900">{tree?.caption}</h1>
      </motion.div> */}

      {showTree && (
        <motion.div className="w-full h-full">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <TreeModel />
          </Canvas>
        </motion.div>
      )}
    </div>
  );
};

export default TreeDetails;
