import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold mb-3 text-gray-700">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
