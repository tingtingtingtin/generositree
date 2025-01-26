import Link from "next/link";
import Header from "@/components/Header";

export default function Thanks() {
  return (
    <div className="flex flex-col h-screen">
      <Header className="text-black" />
      <div className="flex h-full items-center justify-center bg-green-100 p-6">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Thank you!</h1>
          <p className="text-lg text-gray-600">
            We greatly appreciate your contributions!
          </p>
          <div className="flex flex-row justify-between mt-6 text-center">
            <Link href="/" className="text-blue-500 hover:underline">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
