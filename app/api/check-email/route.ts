import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  // process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_URL ||
    "https://macguoyqxeijpszqwvbm.supabase.co",
  // process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hY2d1b3lxeGVpanBzenF3dmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxODQyODYsImV4cCI6MjA1ODc2MDI4Nn0.jtNSW59CnPNgNMWvhG6drk7ft2YilUATeMyfAI6YKgs"
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // First check if email already exists
    const { data: existingEmail, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .single();

    // If we found the email, return a clear message that it's already registered
    if (existingEmail) {
      return NextResponse.json(
        { 
          exists: true,
          message: "This email is already registered on our waitlist." 
        }, 
        { status: 200 }
      );
    }

    // If there was an error but it's not a "not found" error, handle it
    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking email:", checkError);
      throw checkError;
    }

    // Rest of your existing code...
    const { data: userData, error: userError } = await supabase
      .from("waitlist")
      .select("id, referral_code, position_boost")
      .eq("email", email)
      .single();

    if (userError && userError.code !== "PGRST116") {
      console.error("Error fetching user data:", userError);
      throw userError;
    }

    if (userData) {
      const { count: referralCount, error: countError } = await supabase
        .from("waitlist")
        .select("id", { count: "exact", head: true })
        .eq("referred_by", userData.referral_code);

      if (countError) {
        console.error("Error counting referrals:", countError);
        throw countError;
      }

      const safeReferralCount = referralCount ?? 0;

      const positionBoost = Math.floor(safeReferralCount / 5) * 100;

      if (positionBoost !== userData.position_boost) {
        const { error: updateError } = await supabase
          .from("waitlist")
          .update({ position_boost: positionBoost })
          .eq("id", userData.id);

        if (updateError) {
          console.error("Error updating position boost:", updateError);
        }
      }

      const basePosition = await getBasePosition(userData.id);
      const finalPosition = Math.max(1, basePosition - positionBoost);

      return NextResponse.json(
        {
          exists: true,
          position: finalPosition,
          referralCode: userData.referral_code,
          referrals: safeReferralCount,
          referralsNeeded: 5 - (safeReferralCount % 5),
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ exists: false }, { status: 200 });
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { error: "Error checking email" },
      { status: 500 }
    );
  }
}

async function getBasePosition(userId: number) {
  const { count, error } = await supabase
    .from("waitlist")
    .select("id", { count: "exact", head: true })
    .lt("id", userId);

  if (error) {
    console.error("Error getting base position:", error);
    throw error;
  }

  return (count ?? 0) + 1;
}
