/* eslint-disable react/no-unescaped-entities */
import React from "react";
import WaitlistForm from "./components/WaitlistForm";

const HomePage = () => {
  return (
    <div className="text-white">
      <main className="max-w-7xl mx-auto px-14 md:px-2 py-20 md:py-12">
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="w-full text-center md:text-left">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Where Gamers
              <br />
              <span className="text-[#02F199]">Compete</span>
            </h1>
            <div className="mt-10">
              <h2 className="text-3xl font-thin mb-4">
                Join the Winners Circle
              </h2>
              <WaitlistForm />
            </div>
          </div>

          {/* Right Column - Email Mockup */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow-xl p-4 text-gray-800">
              <div className="border-b pb-4 mb-4">
                <div className="mb-3">
                  <div className="text-sm text-gray-600">To</div>
                  <div>julie@gmail.com</div>
                </div>
                <div className="mb-3">
                  <div className="text-sm text-gray-600">Cc</div>
                  <div className="text-[#02F199]">xap@xsapiensai.com</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Subject</div>
                  <div>Let's Connect</div>
                </div>
              </div>
              <div className="mb-4">
                Hey Julie! Yes, I really enjoyed the event too.
                <br />
                Let me know which time...
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Send
                </button>
                <div className="flex gap-2">
                  {Array(8)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-gray-200 rounded" />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
