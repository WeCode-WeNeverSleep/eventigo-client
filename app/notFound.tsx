import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-9xl font-bold text-primary font-title mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-text-muted max-w-md mb-10">
        The page you are looking for doesn't exist or has been moved to another URL.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 transition-opacity duration-200"
      >
        Return Home
      </Link>
    </div>
  );
}
