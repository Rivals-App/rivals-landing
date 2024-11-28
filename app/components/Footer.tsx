import React from "react";
import WaitlistForm from "./WaitlistForm";

const Footer = () => {
  return (
    <div className="bottom-0 bg-[#0a0a0a]">
      <footer className="w-full px-14 py-4 text-center">
        <div className="flex flex-row">
          <div className="hidden md:block w-2/3">
            <div className="bg-gradient-to-tr from-gray-900 to-gray-700 h-[300px] rounded-lg  p-4 text-gray-800"></div>
          </div>
          <section className="w-full md:w-1/3 mb-20 px-8">
            <div className="mt-10">
              <h2 className="text-3xl font-thin mb-4">
                Join the Winners Circle
              </h2>
              <WaitlistForm />
            </div>
          </section>
        </div>
        © 2024 Rivals
      </footer>
    </div>
  );
};

export default Footer;
