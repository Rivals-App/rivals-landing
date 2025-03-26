import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

interface NavbarProps {
  onContinue: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Elliptical container around the content */}
        <div className="bg-[#0F2841] backdrop-blur-md px-8 py-2 rounded-full flex justify-between items-center shadow-md">
          {/* Logo */}
          <Link href="/" className="flex items-center text-2xl font-semibold text-white">
            <Image
              width={50}
              height={50}
              src="/static/svgs/Asset-2.svg"
              alt="logo"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-white text-lg">
            <a href="#why-rivals" className="hover:text-gray-400">Why RIVALS</a>
            <a href="#how-it-works" className="hover:text-gray-400">How It Works</a>
            <Link href="/" className="hover:text-gray-400">Community</Link>
            <Link href="/blog" className="hover:text-gray-400">Blog</Link>
          </div>

          {/* Join Waitlist Button (Desktop) */}
          <button
            onClick={onContinue}
            className="hidden md:block px-8 py-3 bg-[#02F199] text-[#FFFFFF] font-semibold rounded-full hover:scale-105 transition-all duration-200"
          >
            Join Waitlist
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/90 text-white flex flex-col items-center space-y-4 mt-2 py-4 rounded-lg">
            <a href="#why-rivals" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Why RIVALS</a>
            <a href="#how-it-works" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>How It Works</a>
            <Link href="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Community</Link>
            <Link href="/blog" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Blog</Link>
            {/* Join Waitlist Button (Mobile) */}
            <button
              onClick={() => {
                setIsOpen(false);
                onContinue();
              }}
              className="px-8 py-3 bg-[#02F199] text-[#FFFFFF] font-semibold rounded-full hover:scale-105 transition-all duration-200"
            >
              Join Waitlist
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
