import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  // process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_URL ||
    "https://cgmmlkzaovsuzkpluksh.supabase.co",
  // process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbW1sa3phb3ZzdXprcGx1a3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODQyMjksImV4cCI6MjA1Njk2MDIyOX0.MAvRFXCcs03rGyJOGEQA9NhmnGuYquyXd3Q5_w0JLDA"
);

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
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
  // Get the origin from the request
  const origin = req.headers.get("origin");

  // List of allowed origins
  const allowedOrigins = [
    "https://rivalsapp.com",
    "http://localhost:3000",
    "https://rivals-ochre.vercel.app",
  ];

  // Create a new response instead of modifying NextResponse.next()
  const headers = new Headers();

  // Set CORS headers based on the request origin
  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  } else {
    // For development, can be more permissive
    headers.set("Access-Control-Allow-Origin", "*");
  }

  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("X-Content-Type-Options", "nosniff");

  const { firstName, lastName, email, referredBy, preferredConsole, birthday } =
    await req.json();

  if (!firstName || !lastName || !email) {
    return new NextResponse(
      JSON.stringify({ error: "First name, last name, and email are required." }),
      {
        status: 400,
        headers,
      }
    );
  }

  try {
    const referralCode = generateReferralCode(email);

    // Check if referral code is valid if provided
    if (referredBy) {
      const { data: referrerExists, error: referrerError } = await supabase
        .from("waitlist")
        .select("referral_code")
        .eq("referral_code", referredBy)
        .single();

      if (referrerError || !referrerExists) {
        return new NextResponse(
          JSON.stringify({ error: "Invalid referral code." }),
          {
            status: 400,
            headers,
          }
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

    // Insert new user
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          referral_code: referralCode,
          referred_by: referredBy || null,
          position_boost: 0,
          preferred_console: consoleValue,
          birthday: birthdayValue,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting into waitlist:", error);
      throw error;
    }

    // If there's a referrer, update their stats
    if (referredBy) {
      const { data: referrerData, error: referrerDataError } = await supabase
        .from("waitlist")
        .select("id, referral_code")
        .eq("referral_code", referredBy)
        .single();

      if (referrerDataError) {
        console.error("Error getting referrer data:", referrerDataError);
      }

      if (referrerData) {
        // Count referrer's total referrals
        const { count: referralCount, error: countError } = await supabase
          .from("waitlist")
          .select("id", { count: "exact", head: true })
          .eq("referred_by", referredBy);

        if (countError) {
          console.error("Error counting referrals:", countError);
        }

        // Calculate new position boost
        const positionBoost = Math.floor((referralCount ?? 0) / 5) * 100;

        // Update referrer's position boost
        const { error: updateError } = await supabase
          .from("waitlist")
          .update({ position_boost: positionBoost })
          .eq("id", referrerData.id);

        if (updateError) {
          console.error("Error updating position boost:", updateError);
        }
      }
    }

    // Get user's position
    const { count: position, error: positionError } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .lt("id", data.id);

    if (positionError) {
      console.error("Error getting position:", positionError);
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: {
          ...data,
          referralCode,
          position: position ? position + 1 : 1,
          referrals: 0,
          referralsNeeded: 5,
        },
      }),
      {
        status: 201,
        headers,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving to Supabase:", error.message);
      return new NextResponse(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers,
        }
      );
    } else {
      console.error("Unexpected error:", error);
      return new NextResponse(
        JSON.stringify({ error: "An unknown error occurred." }),
        {
          status: 500,
          headers,
        }
      );
    }
  }
}
