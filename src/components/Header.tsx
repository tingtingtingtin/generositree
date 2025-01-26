import Link from "next/link";

export default function Header() {
  const isAuthenticated = false;
  return (
    <header className="flex items-center justify-between p-4 bg-green-600 text-white">
      {/* Left Button */}
      <Link href="/dashboard">
        <button className="bg-green-500 py-2 px-4 rounded hover:bg-green-700">
          Dashboard
        </button>
      </Link>

      {/* Right Links */}
      <div className="flex space-x-6">
        <Link href="/about" className="hover:text-gray-200">
          About
        </Link>
        <Link href="/plant" className="hover:text-gray-200">
          Plant a Tree
        </Link>

        {isAuthenticated ? (
          <>
            <Link href="/account" className="hover:text-gray-200">
              Account
            </Link>
            <button className="hover:text-gray-200">Logout</button>
          </>
        ) : (
          <Link href="/login" className="hover:text-gray-200">
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
