import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-2xl font-mono font-bold mb-6">
        404
      </div>
      <h1 className="text-3xl font-extrabold mb-2 font-mono">Page Not Found</h1>
      <p className="text-zinc-400 max-w-md mb-8 text-sm">
        The page or on-chain resource you are looking for does not exist on Kami Kards.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
