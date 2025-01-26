"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { db, storage } from "@/utils/firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function TreePlantingForm() {
  const [page, setPage] = useState(1); // Tracks the current page
  const [photo, setPhoto] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [donation, setDonation] = useState("");
  const router = useRouter();

  const handleNext = () => setPage((prev) => prev + 1);
  const handleBack = () => setPage((prev) => prev - 1);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!photo) throw new Error("No photo somehow");
      // Step 1: Upload the photo to Firebase Storage
      const storageRef = ref(storage, `images/${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can track progress here
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          // Step 2: Get the download URL after the upload is complete
          const photoURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Step 3: Add the new tree document to the trees collection
          const newTreeRef = doc(db, "trees", `${Date.now()}`); // You can use timestamp or other unique IDs
          const treeData = {
            timePlanted: new Date(),
            imageId: photoURL,
            caption,
            userId: "example", // Replace with actual user ID
          };
          await setDoc(newTreeRef, treeData);

          // Step 4: Update the user's document to include the treeId
          const userRef = doc(db, "users", "example"); // Replace with actual user ID
          await updateDoc(userRef, {
            treeIds: arrayUnion(newTreeRef.id),
          });

          // Step 5: Redirect or show success message
          router.push("/success"); // Or any other route
        }
      );
    } catch (error) {
      console.error("Error submitting tree data:", error);
      alert("Error submitting tree data.");
    }
  };

  const progress = (page / 3) * 100; // Calculate progress bar width

  return (
    <div className="h-[75%] w-full max-w-lg rounded-lg bg-white p-6 shadow-md flex flex-col justify-between">
      {/* Progress Bar */}
      <div className="relative mb-6 h-2 w-full bg-gray-200 rounded">
        <motion.div
          className="absolute h-full bg-green-500 rounded"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Page Content */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 1 && (
            <motion.div
              key="page1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="mb-4 text-2xl font-bold text-gray-800">
                Upload Photo
              </h1>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Show yourself contributing to the preservation and protection of
                the environment.
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mb-4 w-full rounded border p-2 text-sm"
                required
              />
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Caption (Optional)
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe your eco-friendly action..."
                className="mb-4 w-full rounded border p-2 text-sm"
              />
            </motion.div>
          )}

          {page === 2 && (
            <motion.div
              key="page2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="mb-4 text-2xl font-bold text-gray-800">
                Donation Amount
              </h1>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                You don&apos;t have to donate to plant a virtual tree, but your
                contribution is appreciated!
              </label>
              <input
                type="number"
                value={donation}
                onChange={(e) => setDonation(e.target.value)}
                placeholder="Get it started!"
                className="mb-4 w-full rounded border p-2 text-sm"
              />
            </motion.div>
          )}

          {page === 3 && (
            <motion.div
              key="page3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="mb-4 text-2xl font-bold text-gray-800">
                Confirm Submission
              </h1>
              <p className="mb-4 text-gray-700">
                <strong>Photo:</strong>{" "}
                {photo ? photo.name : "No photo uploaded"}
              </p>
              <p className="mb-4 text-gray-700">
                <strong>Caption:</strong> {caption || "No caption provided"}
              </p>
              <p className="mb-4 text-gray-700">
                <strong>Donation:</strong>{" "}
                {donation ? `$${donation}` : "No donation"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div
        className={`flex ${
          page === 1 ? "justify-end" : "justify-between"
        } items-end`}
      >
        {page > 1 && (
          <button
            onClick={handleBack}
            className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {page < 3 ? (
          <button
            onClick={() => {
              if (photo) handleNext();
              else alert("Please provide an image.");
            }}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
