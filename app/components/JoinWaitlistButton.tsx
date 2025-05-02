import React from "react";
import { useRouter } from "next/navigation";

interface JoinWaitlistButtonProps {
  className?: string;
}

const JoinWaitlistButton: React.FC<JoinWaitlistButtonProps> = ({
  className,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/join-us");
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 text-sm bg-[#02F199] text-[#FFFFFF] rounded-full hover:opacity-90 transition-all duration-200 flex items-center space-x-2 shadow-glow ${className}`}
    >
      <span>JOIN WAITLIST</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
    </button>
  );
};

export default JoinWaitlistButton;
