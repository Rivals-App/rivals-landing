import { NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// Define interface for waitlist document data
interface WaitlistData {
  first_name: string;
  last_name: string;
  email: string;
  referral_code: string;
  referred_by: string | null;
  position_boost: number;
  preferred_console: string | null;
  birthday: string | null;
  created_at: FirebaseFirestore.Timestamp;
}

function generateReferralCode(email: string): string {
  const baseCode = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 8; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const emailPrefix = baseCode.slice(0, 4);
  return `${emailPrefix}${randomString}`;
}

export async function POST(req: Request) {
  const response = NextResponse.next();
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://rivals-ochre.vercel.app"
  );
  response.headers.set("Access-Control-Allow-Methods", "POST");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("X-Content-Type-Options", "nosniff");

  const { firstName, lastName, email, referredBy, preferredConsole, birthday } =
    await req.json();

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "First name, last name, and email are required." },
      { status: 400 }
    );
  }

  try {
    const referralCode = generateReferralCode(email);

    // Check if referral code is valid if provided
    if (referredBy) {
      const referrerQuery = await adminDb
        .collection("waitlist")
        .where("referral_code", "==", referredBy)
        .limit(1)
        .get();

      if (referrerQuery.empty) {
        return NextResponse.json(
          { error: "Invalid referral code." },
          { status: 400 }
        );
      }
    }

    // Validate preferred console
    const validConsoles = ["PC", "PS", "XBOX", "Other"];
    const consoleValue =
      preferredConsole && validConsoles.includes(preferredConsole)
        ? preferredConsole
        : null;

    // Validate birthday if provided (ensure they're at least 18)
    let birthdayValue = null;
    if (birthday) {
      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        return NextResponse.json(
          { error: "You must be at least 18 years old to register." },
          { status: 400 }
        );
      }

      birthdayValue = birthday;
    }

    // Get the count of existing users for position calculation
    const countQuery = await adminDb.collection("waitlist").count().get();
    const totalUsers = countQuery.data().count || 0;

    // Insert new user
    const newUserRef = adminDb.collection("waitlist").doc();
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      referral_code: referralCode,
      referred_by: referredBy || null,
      position_boost: 0,
      preferred_console: consoleValue,
      birthday: birthdayValue,
      created_at: FieldValue.serverTimestamp(),
    };

    await newUserRef.set(userData);

    // If there's a referrer, update their stats
    if (referredBy) {
      const referrerQuery = await adminDb
        .collection("waitlist")
        .where("referral_code", "==", referredBy)
        .limit(1)
        .get();

      if (!referrerQuery.empty) {
        const referrerDoc = referrerQuery.docs[0];
        
        // Count referrer's total referrals
        const referralsQuery = await adminDb
          .collection("waitlist")
          .where("referred_by", "==", referredBy)
          .count()
          .get();
        
        const referralCount = referralsQuery.data().count || 0;
        
        // Calculate new position boost
        const positionBoost = Math.floor(referralCount / 5) * 100;
        
        // Update referrer's position boost
        await referrerDoc.ref.update({ position_boost: positionBoost });
      }
    }

    // For position calculation, we'll use the total count 
    // (in Firebase, we can't easily get a "position" based on auto-incrementing ID like in SQL)
    const position = totalUsers + 1;

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUserRef.id,
          ...userData,
          referralCode,
          position: position,
          referrals: 0,
          referralsNeeded: 5,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving to Firebase:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }
}
