import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Get user's record
    const { data: userData, error: userError } = await supabase
      .from("waitlist")
      .select("id, referral_code, position_boost")
      .eq("email", email)
      .single();

    if (userError && userError.code !== "PGRST116") {
      throw userError;
    }

    if (userData) {
      // Count referrals for this user
      const { count: referralCount, error: countError } = await supabase
        .from("waitlist")
        .select("id", { count: "exact", head: true })
        .eq("referred_by", userData.referral_code);

      if (countError) {
        throw countError;
      }

      // Ensure referralCount is not null, default to 0 if it is
      const safeReferralCount = referralCount ?? 0;

      // Calculate adjusted position based on referrals
      const positionBoost = Math.floor(safeReferralCount / 5) * 100; // Move up 100 positions for every 5 referrals

      // If position boost has changed, update it
      if (positionBoost !== userData.position_boost) {
        await supabase
          .from("waitlist")
          .update({ position_boost: positionBoost })
          .eq("id", userData.id);
      }

      // Calculate final position
      const basePosition = await getBasePosition(userData.id);
      const finalPosition = Math.max(1, basePosition - positionBoost);

      return NextResponse.json(
        {
          exists: true,
          position: finalPosition,
          referralCode: userData.referral_code,
          referrals: safeReferralCount,
          referralsNeeded: 5 - (safeReferralCount % 5), // Referrals needed for next boost
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
    throw error;
  }

  return (count ?? 0) + 1;
}
