"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [donation, setDonation] = useState("");
  const router = useRouter();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo || !donation) {
      alert("Please upload a photo and enter a donation amount!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("caption", caption);
    formData.append("donation", donation);

    try {
      // Upload the photo (implement separately if needed)
      // const photoUploadResponse = await fetch("/api/uploadPhoto", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!photoUploadResponse.ok) {
      //   alert("Error uploading photo!");
      //   return;
      // }

      const userEmail = "user@example.com"; // Replace with user-specific email
      const treePlantResponse = await fetch("/api/plantTree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treeCount: 1,
          user: userEmail,
        }),
      });

      const treePlantData = await treePlantResponse.json();

      if (treePlantResponse.ok) {
        console.log("Tree planted successfully!");
        setPhoto(null);
        setCaption("");
        setDonation("");
        router.push("/success");
      } else {
        alert(`Error planting tree: ${treePlantData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-100 p-6">
      <form
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Plant a Tree</h1>

        {/* Photo Upload */}
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Upload Photo of Your Eco-Friendly Action
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="mb-4 w-full rounded border p-2 text-sm"
        />

        {/* Caption */}
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Caption (Optional)
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Describe your eco-friendly action..."
          className="mb-4 w-full rounded border p-2 text-sm"
        />

        {/* Donation */}
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Donation Amount (USD)
        </label>
        <input
          type="number"
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
          placeholder="Enter donation amount"
          className="mb-4 w-full rounded border p-2 text-sm"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded bg-green-500 py-2 text-white hover:bg-green-600"
        >
          Plant Tree
        </button>
      </form>
    </div>
  );
}
