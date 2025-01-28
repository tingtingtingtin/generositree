"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

interface SuccessProps {
  treeId: string;
}

export default function Success() {
  const params = useSearchParams();
  const treeId = params.get("treeId");
  if (!treeId) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">404 - Tree Not Found</h1>
        <p className="text-lg mt-4">
          The tree you are looking for does not exist.
        </p>
        <Link href="/plant" className="text-blue-500 hover:underline mt-6">
          Plant a new tree
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      <Header className="text-black" />
      <div className="flex h-full items-center justify-center bg-green-100 p-6">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Success!</h1>
          <p className="text-lg text-gray-600">
            Your tree has been successfully planted!
          </p>
          <div className="flex flex-row justify-between mt-6 text-center">
            <Link
              href={`/explore/${treeId}`}
              className="text-blue-500 hover:underline"
            >
              Go to your tree
            </Link>
            <Link href="/plant" className="text-blue-500 hover:underline">
              Plant another tree
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
