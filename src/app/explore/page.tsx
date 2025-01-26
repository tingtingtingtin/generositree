"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation in a client component
import Header from "@/components/Header";

const TREES = {
  tree1: {
    caption: "Example caption",
    donationIds: "gggg",
    imageId: "https://picsum.photos/200",
    timePlanted: new Date(),
    userId: "example",
  },
  tree2: {
    caption: "Second tree caption",
    donationIds: "hhhh",
    imageId: "https://picsum.photos/201",
    timePlanted: new Date(),
    userId: "example2",
  },
  tree3: {
    caption: "Third tree caption",
    donationIds: "iiii",
    imageId: "https://picsum.photos/202",
    timePlanted: new Date(),
    userId: "example3",
  },
};

const Explore = () => {
  const [trees, setTrees] = useState(TREES);
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full bg-green-700 relative">
        {Object.entries(trees).map(([id, tree]) => {
          const randomX = 40 + Math.random() * 30; // Restricting X to 40% - 70%
          const randomY = 40 + Math.random() * 30; // Restricting Y to 40% - 70%

          return (
            <div
              key={id}
              style={{
                position: "absolute",
                top: `${randomY}%`,
                left: `${randomX}%`,
                width: "20px",
                height: "20px",
                backgroundColor: "darkgreen",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => router.push(`/explore/${id}`)}
            />
          );
        })}
        <button
          onClick={() => setTrees({ ...TREES })}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            backgroundColor: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Click Me
        </button>
      </div>
    </div>
  );
};

export default Explore;
