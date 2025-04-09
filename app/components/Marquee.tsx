"use client";
import { SponsorMarqueeProps } from "../interface/types";
import Image from "next/image";

const SponsorMarquee = ({ sponsorLogos }: SponsorMarqueeProps) => {
  const duplicatedLogos = [
    ...sponsorLogos,
    ...sponsorLogos,
    ...sponsorLogos,
    ...sponsorLogos,
  ];

  return (
    <section className="w-full text-white py-20 px-4 md:px-8 mb-20 text-center">
      <h2 className="text-3xl lg:text-4xl font-bold mb-8">Powered by</h2>

      <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden">
        <div className="inline-flex animate-marquee">
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="flex-shrink-0 px-8">
              <Image
                src={logo.src}
                alt={logo.name}
                width={128}
                height={128}
                className={`w-32 grayscale transition-all duration-300 hover:grayscale-0 ${
                  logo.name === "ApplePayLogo" ? "invert" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Optional: Pause animation on hover */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SponsorMarquee;
