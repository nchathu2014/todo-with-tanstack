import Link from "next/link";
const BASE_URL = process.env.NEXT_BASE_URL || "";

export function Header() {
  return (
    <nav className="bg-gray-50 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col  md:flex-row justify-between items-center p-3">
          <h1 className="text-2xl md:text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            S<span className="text-gray-500">tride</span>
          </h1>
          <div className="text-sm">
            Your <span className="text-gray-500">day</span>. Your{" "}
            <span className="text-gray-500">pace</span>. Your{" "}
            <span className="text-gray-500">progress</span>.
          </div>
        </div>
      </div>
    </nav>
  );
}
