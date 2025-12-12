"use client";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-800 p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center">
        You are offline
      </h1>
      <p classname="text-gray-600 text-center max-w-md text-sm sm:text-base">
        It seems you lost your internet connection. You can still browse cached
        pages, but some features may not be available.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 shadow-md text-sm sm:text-base"
      >
        Retry Connection
      </button>
    </div>
  );
}
