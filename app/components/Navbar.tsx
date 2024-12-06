import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-black/10 backdrop-blur-sm p-3 md:p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-white">
          <Image
            width={50}
            height={50}
            src={"/static/svgs/Asset-2.svg"}
            alt="logo"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
