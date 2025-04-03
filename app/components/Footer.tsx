import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo on left and Quick Links + Waitlist on right */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="flex items-center w-full md:w-auto justify-center md:justify-start">
            <div className="relative h-8 w-auto">
              <img
                src="/static/media/Logo2.png"
                alt="RIVALS Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Right Section: Quick Links and Waitlist Button side-by-side */}
          <div className="flex flex-col md:flex-row md:items-start items-center w-full md:w-auto gap-8">
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mt-4 mb-2 text-center md:text-left">QUICK LINKS</h4>
              <ul className="space-y-1 text-center md:text-left">
                <li>
                  <a href="#" className="hover:text-[#02F199]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#02F199]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#02F199]">
                    Arcade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#02F199]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#02F199]">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#02F199]">
                    Legal
                  </a>
                </li>
              </ul>
            </div>

            {/* Waitlist Button */}
            <button
              // onClick={handleWaitlistClick}
              className="px-8 py-3 bg-[#02F199] text-[#0c412e] font-semibold rounded-full hover:scale-105 transition-all duration-200 mx-auto md:mx-0"
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>

        {/* Social Icons: Placed just above the copyright line */}
        <div className="mt-8 flex justify-center space-x-4">
          <a href="https://www.linkedin.com/company/rivals-gaming/" aria-label="LinkedIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-6 w-6"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.2c-.96 0-1.75-.78-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 11.2h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.6z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              shapeRendering="geometricPrecision" 
              textRendering="geometricPrecision" 
              imageRendering="optimizeQuality" 
              className="h-6 w-6"
              fill="currentColor"
              fillRule="evenodd" 
              clipRule="evenodd" 
              viewBox="0 0 512 462.799"
            >
              <path fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
            </svg>
          </a>
          <a href="https://discord.gg/YztnrmQT5M" aria-label="Discord">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              shapeRendering="geometricPrecision" 
              textRendering="geometricPrecision" 
              imageRendering="optimizeQuality" 
              className="h-6 w-6"
              fill="currentColor"
              fillRule="evenodd" 
              clipRule="evenodd" 
              viewBox="0 0 512 388.049"
            >
              <path fillRule="nonzero" d="M433.713 32.491A424.231 424.231 0 00328.061.005c-4.953 8.873-9.488 18.156-13.492 27.509a393.937 393.937 0 00-58.629-4.408c-19.594 0-39.284 1.489-58.637 4.37-3.952-9.33-8.543-18.581-13.525-27.476-36.435 6.212-72.045 17.196-105.676 32.555-66.867 98.92-84.988 195.368-75.928 290.446a425.967 425.967 0 00129.563 65.03c10.447-14.103 19.806-29.116 27.752-44.74a273.827 273.827 0 01-43.716-20.862c3.665-2.658 7.249-5.396 10.712-8.055 40.496 19.019 84.745 28.94 129.514 28.94 44.77 0 89.019-9.921 129.517-28.943 3.504 2.86 7.088 5.598 10.712 8.055a275.576 275.576 0 01-43.796 20.918 311.49 311.49 0 0027.752 44.705 424.235 424.235 0 00129.65-65.019l-.011.011c10.632-110.26-18.162-205.822-76.11-290.55zM170.948 264.529c-25.249 0-46.11-22.914-46.11-51.104 0-28.189 20.135-51.304 46.029-51.304 25.895 0 46.592 23.115 46.15 51.304-.443 28.19-20.336 51.104-46.069 51.104zm170.102 0c-25.29 0-46.069-22.914-46.069-51.104 0-28.189 20.135-51.304 46.069-51.304s46.472 23.115 46.029 51.304c-.443 28.19-20.296 51.104-46.029 51.104z"/>
            </svg>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs">
          © 2025 Rivals. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
