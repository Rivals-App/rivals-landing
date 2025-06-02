import { NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";
import { DocumentSnapshot } from "firebase-admin/firestore";

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

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Find user by email
    const userQuery = await adminDb
      .collection("waitlist")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!userQuery.empty) {
      const userDoc = userQuery.docs[0];
      const userData = { 
        id: userDoc.id, 
        ...userDoc.data() as WaitlistData 
      };
      
      // Count referrals
      const referralsQuery = await adminDb
        .collection("waitlist")
        .where("referred_by", "==", userData.referral_code)
        .count()
        .get();
      
      const referralCount = referralsQuery.data().count || 0;
      
      // Calculate position boost
      const positionBoost = Math.floor(referralCount / 5) * 100;
      
      // Update position boost if needed
      if (positionBoost !== userData.position_boost) {
        await userDoc.ref.update({ position_boost: positionBoost });
      }
      
      // Calculate position based on creation timestamp
      const basePosition = await getBasePosition(userDoc);
      const finalPosition = Math.max(1, basePosition - positionBoost);
      
      return NextResponse.json(
        {
          exists: true,
          position: finalPosition,
          referralCode: userData.referral_code,
          referrals: referralCount,
          referralsNeeded: 5 - (referralCount % 5),
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

async function getBasePosition(userDoc: DocumentSnapshot) {
  // In Firestore, we need to use timestamp for ordering
  const data = userDoc.data() as WaitlistData | undefined;
  const createdAt = data?.created_at;
  
  if (!createdAt) {
    // If no timestamp is available, fall back to a default position
    const countQuery = await adminDb.collection("waitlist").count().get();
    return countQuery.data().count || 1;
  }
  
  // Count documents created before this one
  const earlierDocsQuery = await adminDb
    .collection("waitlist")
    .where("created_at", "<", createdAt)
    .count()
    .get();
  
  return (earlierDocsQuery.data().count || 0) + 1;
}
