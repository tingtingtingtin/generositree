"use client";

import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    // Optional: You can use setTimeout to redirect after a few seconds
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 3000);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-100 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Success!</h1>
        <p className="text-lg text-gray-600">
          Your tree has been successfully planted!
        </p>
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-500 hover:underline">
            Plant another tree
          </a>
        </div>
      </div>
    </div>
  );
}
