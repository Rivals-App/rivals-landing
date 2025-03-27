/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="text-white w-full h-screen bg-[#101c2b]">
        <div className="w-[50%] mx-auto min-h-screen flex flex-col items-center text-center justify-center">
          <h2 className="text-4xl md:text-6xl font-thin mb-4">
            Oops. It seems this page doesn't exist yet...
          </h2>

          <Link
            href="/"
            className="w-full uppercase text-md py-2 mt-8 text-black font-thin bg-white border border-white hover:bg-transparent hover:text-white transition-all duration-150"
          >
            Home
          </Link>
        </div>
      </div>
    </>
  );
}
