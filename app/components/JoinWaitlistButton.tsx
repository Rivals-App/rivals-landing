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
      className={`
        px-6 py-3 
        bg-[#02F199] 
        text-[#000000] 
        rounded-full 
        border-2 
        border-[#02F199]/30
        font-semibold
        transition-all 
        duration-300 
        flex 
        items-center 
        space-x-2 
        shadow-md
        hover:shadow-[0_0_15px_rgba(2,241,153,0.6)]
        hover:border-[#02F199]/60
        active:scale-95
        ${className}
      `}
    >
      <span>JOIN WAITLIST</span>
      {/* <svg
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
      </svg> */}
    </button>
  );
};

export default JoinWaitlistButton;
