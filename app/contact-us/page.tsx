/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { gsap, Power3 } from "gsap";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline
        .from(".contact-hero", { opacity: 0, y: 50, duration: 1, ease: "power3.out", force3D: true })
        .from(".contact-info", { opacity: 0, x: -50, duration: 1, delay: 0.5, ease: "power3.out", force3D: true }, "-=0.5")
        .from(".contact-form", { opacity: 0, x: 50, duration: 1, delay: 0.5, ease: "power3.out", force3D: true }, "-=0.5")
        .from(".faq-section", { opacity: 0, y: 50, duration: 1, delay: 1, ease: "power3.out", force3D: true }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      {/* Grid background */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact Rivals",
              url: "https://www.rivalsapp.com/contact",
              mainEntity: {
                "@type": "Organization",
                name: "Rivals Gaming Ltd",
                url: "https://www.rivalsapp.com",
                email: "raj@rivalsapp.com",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Support",
                  email: "raj@rivalsapp.com",
                  availableLanguage: "English",
                },
              },
            }),
          }}
        />
      </Head>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          height: '100vh',
          width: '100vw',
          background: `linear-gradient(
            90deg,
            rgba(255,255,255,0.1) 1px,
            transparent 1px 45px
          )
          50% 50% / 45px 45px,
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px 45px)
          50% 50% / 45px 45px`,
          mask: 'linear-gradient(-20deg, transparent 50%, black)',
          zIndex: 0
        }}
      ></div>

      <div className="w-full min-h-screen flex flex-col bg-transparent relative z-10">
        <Navbar />

        {/* Hero Section */}
        <main className="contact-hero flex-grow container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#02F199] to-[#04D9FF]">
              CONTACT US
            </h1>
            <p className="text-xl text-center mb-12 text-gray-300">
              Have a question, partnership proposal, or press enquiry? Drop us a
              message — we’re listening.
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="contact-info md:col-span-1 space-y-8">
                <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                  <div className="text-[#02F199] mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-gray-300">support@rivalsapp.com</p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                  <div className="text-[#02F199] mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
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
                  <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                  <div className="flex space-x-4 mt-4">
                    <a
                      href="https://www.linkedin.com/company/rivals-gaming/"
                      aria-label="LinkedIn"
                    >
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
                        <path
                          fillRule="nonzero"
                          d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                        />
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
                        <path
                          fillRule="nonzero"
                          d="M433.713 32.491A424.231 424.231 0 00328.061.005c-4.953 8.873-9.488 18.156-13.492 27.509a393.937 393.937 0 00-58.629-4.408c-19.594 0-39.284 1.489-58.637 4.37-3.952-9.33-8.543-18.581-13.525-27.476-36.435 6.212-72.045 17.196-105.676 32.555-66.867 98.92-84.988 195.368-75.928 290.446a425.967 425.967 0 00129.563 65.03c10.447-14.103 19.806-29.116 27.752-44.74a273.827 273.827 0 01-43.716-20.862c3.665-2.658 7.249-5.396 10.712-8.055 40.496 19.019 84.745 28.94 129.514 28.94 44.77 0 89.019-9.921 129.517-28.943 3.504 2.86 7.088 5.598 10.712 8.055a275.576 275.576 0 01-43.796 20.918 311.49 311.49 0 0027.752 44.705 424.235 424.235 0 00129.65-65.019l-.011.011c10.632-110.26-18.162-205.822-76.11-290.55zM170.948 264.529c-25.249 0-46.11-22.914-46.11-51.104 0-28.189 20.135-51.304 46.029-51.304 25.895 0 46.592 23.115 46.15 51.304-.443 28.19-20.336 51.104-46.069 51.104zm170.102 0c-25.29 0-46.069-22.914-46.069-51.104 0-28.189 20.135-51.304 46.069-51.304s46.472 23.115 46.029 51.304c-.443 28.19-20.296 51.104-46.029 51.104z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form md:col-span-2">
                <div className="bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700">
                  {submitStatus === "success" ? (
                    <div className="text-center py-8">
                      <svg
                        className="mx-auto h-16 w-16 text-[#02F199]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mt-4 text-xl font-medium">
                        Message sent successfully!
                      </h3>
                      <p className="mt-2 text-gray-300">
                        We'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02F199] focus:border-transparent"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02F199] focus:border-transparent"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02F199] focus:border-transparent"
                        >
                          <option value="">Select a topic</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="feedback">Feedback</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02F199] focus:border-transparent"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full px-6 py-3 rounded-full font-medium text-[#0c412e] bg-[#02F199] hover:scale-105 transition-all duration-200 ${
                            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                          }`}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#0c412e]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            "Send Message"
                          )}
                        </button>

                        {submitStatus === "error" && (
                          <p className="mt-2 text-sm text-red-400">
                            There was an error sending your message. Please try
                            again.
                          </p>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Frequently Asked Questions
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                  <h3 className="text-lg font-medium mb-2 text-[#02F199]">
                    How do I join RIVALS?
                  </h3>
                  <p className="text-gray-300">
                    You can join our waitlist by clicking the "Join Waitlist"
                    button. Once we launch, you'll be among the first to be
                    invited.
                  </p>
                </div>

                <div className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                  <h3 className="text-lg font-medium mb-2 text-[#02F199]">
                    What platforms is RIVALS available on?
                  </h3>
                  <p className="text-gray-300">
                    RIVALS will be available on major web browsers, with dedicated
                    mobile apps coming soon after launch.
                  </p>
                </div>

                <div className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                  <h3 className="text-lg font-medium mb-2 text-[#02F199]">
                    Is RIVALS free to play?
                  </h3>
                  <p className="text-gray-300">
                    RIVALS will have both free and premium features. Our core
                    gameplay experience will always be accessible to all users.
                  </p>
                </div>

                <div className="bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
                  <h3 className="text-lg font-medium mb-2 text-[#02F199]">
                    How can I become a partner?
                  </h3>
                  <p className="text-gray-300">
                    For partnership inquiries, please select "Partnership" in the
                    contact form subject and provide details about your
                    organization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
