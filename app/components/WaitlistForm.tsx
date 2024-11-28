"use client";
import { useState } from "react";

const WaitlistForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Successfully joined the waitlist!");
        setName("");
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
    <form onSubmit={handleSubmit} className="rounded w-full">
      <div className="mb-4">
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-[#02F199] focus:outline-none"
          required
        />
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
        className="w-full text-xl bg-[#02F199] text-black hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        {loading ? "Submitting..." : "Join Waitlist"}
      </button>
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </form>
  );
};

export default WaitlistForm;
