import Link from "next/link";

export default function Success() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-100 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Success!</h1>
        <p className="text-lg text-gray-600">
          Your tree has been successfully planted!
        </p>
        <div className="mt-6 text-center">
          <Link href="/plant" className="text-blue-500 hover:underline">
            Plant another tree
          </Link>
        </div>
      </div>
    </div>
  );
}
