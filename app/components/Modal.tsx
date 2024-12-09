"use client";
import React, { useState, useEffect } from "react";

const ModalWaitlistForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [referralLink, setReferralLink] = useState("");

  // Get referral code from URL if it exists
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get("ref");
    if (referralCode) {
      // Store it to use when submitting the form
      localStorage.setItem("referralCode", referralCode);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
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
        // Create URL
        const referralUrl = `${window.location.origin}${window.location.pathname}?ref=${data.data.referralCode}`;
        setReferralLink(referralUrl);
        setSuccessMessage("Successfully joined the waitlist!");
        setFirstName("");
        setLastName("");
        setEmail("");
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

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#02F199] text-black hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Join Waitlist
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-black border border-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">
              Join Our Waitlist
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-[#02F199] focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-[#02F199] focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
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
                className="w-full text-xl bg-[#02F199] text-black hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Join Waitlist"}
              </button>

              {successMessage && (
                <div className="space-y-4">
                  <p className="text-green-500 text-center">{successMessage}</p>
                  {referralLink && (
                    <div className="mt-4">
                      <p className="text-white mb-2">
                        Share your unique url via email, text or socials and get
                        early access to the first Demo!
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={referralLink}
                          readOnly
                          className="w-full p-2 bg-gray-800 rounded-lg text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(referralLink);
                            alert("Copied to clipboard!");
                          }}
                          className="p-2 bg-[#02F199] rounded-lg"
                        >
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
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWaitlistForm;
