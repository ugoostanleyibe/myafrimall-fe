import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-white">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-gray-500">Page not found</p>
      <Link
        href="/login"
        className="mt-8 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Go to Login
      </Link>
    </main>
  );
}
