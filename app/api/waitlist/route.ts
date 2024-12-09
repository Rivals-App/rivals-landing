import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { config } from '../../lib/config'; // adjust path as needed


const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);


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
  response.headers.set('Access-Control-Allow-Origin', 'https://rivals-ochre.vercel.app');
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  const { firstName, lastName, email, referredBy } = await req.json();

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
      const { data: referrerExists } = await supabase
        .from("waitlist")
        .select("referral_code")
        .eq("referral_code", referredBy)
        .single();

      if (!referrerExists) {
        return NextResponse.json(
          { error: "Invalid referral code." },
          { status: 400 }
        );
      }
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
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // If there's a referrer, update their stats
    if (referredBy) {
      const { data: referrerData } = await supabase
        .from("waitlist")
        .select("id, referral_code")
        .eq("referral_code", referredBy)
        .single();

      if (referrerData) {
        // Count referrer's total referrals
        const { count: referralCount } = await supabase
          .from("waitlist")
          .select("id", { count: "exact", head: true })
          .eq("referred_by", referredBy);

        // Calculate new position boost
        const positionBoost = Math.floor((referralCount ?? 0) / 5) * 100;

        // Update referrer's position boost
        await supabase
          .from("waitlist")
          .update({ position_boost: positionBoost })
          .eq("id", referrerData.id);
      }
    }

    // Get user's position
    const { count: position } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .lt("id", data.id);

    return NextResponse.json(
      {
        success: true,
        data: {
          ...data,
          referralCode,
          position: position ? position + 1 : 1,
          referrals: 0,
          referralsNeeded: 5,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving to Supabase:", error.message);
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
