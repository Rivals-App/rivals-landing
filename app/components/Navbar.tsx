import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full bg-transparent p-3 md:p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/App Name */}
        <Link href="/" className="text-2xl font-semibold text-white">
          <Image
            width={80}
            height={80}
            src={"/static/svgs/Asset-2.svg"}
            alt="logo"
          />
        </Link>

        {/* Navigation Links */}
        <div className="space-x-8">
          <Link
            href="/how-it-works"
            className="text-white/60 hover:text-white transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/join-waitlist"
            className="text-white font-bold bg-gradient-to-r hover:bg-gradient-to-l from-[#02F199] to-[#56A6FF] px-10 py-3 rounded-lg transition-all duration-200"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
