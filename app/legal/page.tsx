"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

// Legal document content
const legalDocuments = {
  terms: {
    title: "Terms of Service",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: "Rivals, a trading name of Rivals Gaming Ltd (Company No. 16249665), registered at 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ (\"we,\" \"us,\" or \"our\"). By accessing or using Rivals, you agree to these Terms of Service (\"Terms\"). If you do not agree, please refrain from using our services."
      },
      {
        title: "1. Eligibility",
        text: "1.1. You must be at least 18 years old to use Rivals.\n\n1.2. If you are under 18 but at least 13, you may use Rivals only if your parent or legal guardian creates an account on your behalf and agrees to these Terms.\n\n1.3. Users under 13 are not permitted to access Rivals."
      },
      {
        title: "2. Accounts",
        text: "2.1. Each individual is allowed one account. Creating multiple accounts may result in termination.\n\n2.2. Users are responsible for maintaining the security of their accounts.\n\n2.3. In the future, account verification may require ID checks to confirm your identity."
      },
      {
        title: "3. Monetisation and Transactions",
        text: "3.1. Rivals operates using real money.\n\n3.2. By using our services, you agree to the applicable transaction fees, which are disclosed during payment or withdrawal processes.\n\n3.3. All deposits and withdrawals are final. Ensure your account details are accurate before completing transactions."
      },
      {
        title: "4. User Responsibilities and Conduct",
        text: "4.1. Users must adhere to the following rules of conduct:\n- No hate speech, harassment, or discrimination of any kind.\n- No cheating, fraud, or unfair practices.\n\n4.2. Failure to comply may result in account suspension or termination.\n\n4.3. All disputes regarding gameplay or matches will be handled by Rivals' Admins. The Admin's decision is final."
      },
      {
        title: "5. Inactive Accounts and Termination",
        text: "5.1. Accounts with no activity for 12 months will be deemed inactive and may be permanently closed.\n\n5.2. Upon termination of an account, unused funds will not be refunded unless required by law."
      },
      {
        title: "6. Uploaded Content and Intellectual Property",
        text: "6.1. By using Rivals, you grant us the right to use, modify, and display any content you upload (e.g., gameplay clips, images) for purposes related to Rivals.\n\n6.2. Rivals and its associated intellectual property remain the exclusive property of MS UN LTD."
      },
      {
        title: "7. Privacy Policy",
        text: "7.1. Rivals collects and uses personal data in accordance with its Privacy Policy, outlined separately."
      },
      {
        title: "8. Governing Law and Dispute Resolution",
        text: "8.1. These Terms are governed by the laws of England and Wales.\n\n8.2. Any disputes will be resolved in the simplest possible manner, such as small claims court or informal negotiation."
      },
      {
        title: "9. Changes to Terms",
        text: "9.1. We reserve the right to modify these Terms at any time. Changes will be communicated via email or through the platform. Your continued use of Rivals constitutes acceptance of the updated Terms."
      },
      {
        title: "10. Contact Us",
        text: "If you have questions regarding these Terms, please contact us at support@rivalsapp.com."
      }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    effectiveDate: "17 January 2025",
    content: [
      {
        title: "Introduction",
        text: "This Privacy Policy explains how Rivals Gaming Ltd collects, uses, and protects your personal information when you use our platform. We are committed to ensuring the privacy and security of your data."
      },
      {
        title: "1. Information We Collect",
        text: "1.1. Account Information: Name, email address, date of birth, and other details provided during registration.\n\n1.2. Financial Information: Payment details, transaction history, and withdrawal information.\n\n1.3. Gameplay Data: Game statistics, match history, and interaction with other users.\n\n1.4. Technical Data: IP address, device information, browser type, and operating system."
      },
      {
        title: "2. How We Use Your Information",
        text: "2.1. To provide and improve our services.\n\n2.2. To process transactions and manage your account.\n\n2.3. To verify your identity and prevent fraud.\n\n2.4. To communicate with you about updates, promotions, and support."
      },
      {
        title: "3. Data Sharing",
        text: "3.1. Service Providers: We may share data with third-party service providers who assist us in operating our platform (e.g., payment processors, analytics services).\n\n3.2. Legal Requirements: We may disclose information when required by law or to protect our rights or the safety of users."
      },
      {
        title: "4. Data Security",
        text: "We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, or alteration."
      },
      {
        title: "5. Your Rights",
        text: "You have the right to access, correct, delete, or restrict the processing of your personal data. To exercise these rights, contact us at privacy@rivalsapp.com."
      },
      {
        title: "6. Data Retention",
        text: "We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law."
      },
      {
        title: "7. Cookies",
        text: "We use cookies and similar technologies to enhance your experience on our platform. You can manage cookie preferences through your browser settings."
      },
      {
        title: "8. Changes to This Policy",
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through our platform."
      },
      {
        title: "9. Contact Information",
        text: "If you have questions about this Privacy Policy, please contact us at privacy@rivalsapp.com."
      }
    ]
  }
};

const LegalPage: React.FC = () => {
  const [activeDocument, setActiveDocument] = useState("terms");

  const menuItems = [
    { id: "terms", label: "Terms of Service" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "data", label: "Data Protection" },
    { id: "cookies", label: "Cookie Policy" },
    { id: "acceptable", label: "Acceptable Use" },
    { id: "skill", label: "Legality of Skill Gaming" },
    { id: "companies", label: "Rivals Companies" }
  ];

  // Get the current document data
  const currentDoc = legalDocuments[activeDocument as keyof typeof legalDocuments] || legalDocuments.terms;

  return (
    <div className="min-h-screen bg-[#0F2841] flex flex-col text-white">
      <div className="w-full min-h-screen flex flex-col bg-transparent mb-12">
        <Navbar />

        <div className="pt-20 md:pt-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            <span className="text-[#02F199]">RIVALS</span> LEGAL
          </h1>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12">
            This section outlines the legal documents governing the use of Rivals, including terms, policies,
            and company registrations. By using our platform, you agree to the terms detailed here.
          </p>

          {/* Mobile dropdown */}
          <div className="md:hidden w-full mb-6">
            <select
              className="w-full p-3 bg-[#121212]/40 border border-white/20 text-white rounded-lg"
              value={activeDocument}
              onChange={(e) => setActiveDocument(e.target.value)}
            >
              {menuItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop layout: main content centered with an absolutely positioned sidebar */}
          <div className="relative">
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl p-6 md:p-8">
                {currentDoc ? (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{currentDoc.title}</h2>
                    <p className="text-[#02F199] mb-6">
                      Effective Date: {currentDoc.effectiveDate}
                    </p>

                    <div className="space-y-6">
                      {currentDoc.content.map((section, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {section.title}
                          </h3>
                          <div className="text-gray-300 whitespace-pre-wrap">
                            {section.text.split("\n").map((line, i) => (
                              <p key={i} className="mb-2">
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg text-gray-300">
                      This content is coming soon. We are currently updating our legal documents.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar for Desktop */}
            <div className="hidden md:block absolute top-0 left-[-80px] w-56">
              <div className="bg-[#121212]/20 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-white/10">
                  <h2 className="font-bold text-xl">Legal Documents</h2>
                </div>
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveDocument(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeDocument === item.id
                          ? "bg-[#02F199]/20 text-[#02F199]"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;