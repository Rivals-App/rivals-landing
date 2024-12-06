"use client";
import { useState, useEffect } from "react";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

const WaitlistForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [referrals, setReferrals] = useState(0);
  const [referralsNeeded, setReferralsNeeded] = useState(5);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get("ref");
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Check if email exists
      const checkRes = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const checkData = await checkRes.json();

      if (checkData.exists) {
        setWaitlistPosition(checkData.position);
        setReferrals(checkData.referrals);
        setReferralsNeeded(checkData.referralsNeeded);
        const referralUrl = `${window.location.origin}${window.location.pathname}?ref=${checkData.referralCode}`;
        setReferralLink(referralUrl);
        setSuccessMessage("Welcome back!");
        return;
      }

      // If email doesn't exist, proceed with registration
      const referredBy = localStorage.getItem("referralCode");
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          referredBy,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const referralUrl = `${window.location.origin}${window.location.pathname}?ref=${data.data.referralCode}`;
        setReferralLink(referralUrl);
        setSuccessMessage("Successfully joined the waitlist!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setWaitlistPosition(data.data.position);
        setReferrals(0);
      } else {
        setErrorMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl w-[90%] lg:w-[40%] bg-black border border-gray-600 mx-auto px-8 pt-16 pb-8"
    >
      <h2 className="text-2xl lg:text-4xl font-thin">
        Join the winners circle.
      </h2>
      <p className="text-sm lg:text-md text-[#02F199] font-thin mb-8">
        Are you game?
      </p>

      {/* Name inputs row */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-[#02F199] focus:outline-none"
            required
          />
        </div>
        <div className="flex-1">
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-[#02F199] focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-[#02F199] focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-xl bg-[#02F199] text-black hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Join Waitlist"}
      </button>

      {successMessage && (
        <div className="mt-4 space-y-4">
          {waitlistPosition && (
            <div className="rounded-lg border border-gray-600 p-6 space-y-4">
              <div className="text-center">
                <div className="text-[#02F199] text-6xl font-bold mb-2">
                  #{waitlistPosition}
                </div>
                <div className="text-gray-400">
                  Your position in the waitlist
                </div>
              </div>
              <div className="text-center">
                <div className="text-[#02F199] text-4xl font-bold mb-2">
                  {referrals}
                </div>
                <div className="text-gray-400">Referrals</div>
                {referralsNeeded > 0 && (
                  <div className="text-sm text-gray-400 mt-2">
                    {referralsNeeded} more{" "}
                    {referralsNeeded === 1 ? "referral" : "referrals"} needed to
                    move up 100 positions
                  </div>
                )}
              </div>
            </div>
          )}
          {referralLink && (
            <div className="space-y-2">
              <p className="text-white">Tell a friend to tell a friend:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="w-full p-2 bg-[#02F199]/10 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    copied
                      ? "border border-[#02F199] hover:bg-[#02F199] text-white"
                      : "border border-[#02F199] hover:bg-[#02F199] hover:text-white"
                  }`}
                >
                  {copied ? (
                    <FaCheck className="w-5 h-5" />
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex justify-start gap-6 py-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#02F199] transition-colors"
                >
                  <FaDiscord size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#02F199] transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#02F199] transition-colors"
                >
                  <FaXTwitter size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#02F199] transition-colors"
                >
                  <FaYoutube size={24} />
                </a>
              </div>

              <div className="mt-12 bg-[#02F199]/10 p-4 rounded-lg">
                <div className="flex flex-row items-end align-center gap-3">
                  <div className="mt-1">
                    <svg
                      className="w-5 h-5 text-[#02F199]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">
                    Invite 5 friends to move up the waitlist and get earlier
                    access to the demo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </form>
  );
};

export default WaitlistForm;
