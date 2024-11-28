/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="text-black w-full h-screen bg-white">
        <div className="w-[50%] mx-auto min-h-screen flex flex-col items-center text-center justify-center">
          <h2 className="text-4xl md:text-6xl font-thin mb-4">
            Oops. It seems this page doesn't exist yet...
          </h2>

          <Link
            href="/"
            className="w-full uppercase text-md py-2 mt-8 text-white font-thin bg-black border border-black hover:bg-transparent hover:text-black transition-all duration-150"
          >
            Home
          </Link>
        </div>
      </div>
    </>
  );
}
