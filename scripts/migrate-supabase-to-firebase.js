// Migration script to move data from Supabase to Firebase
const { createClient } = require("@supabase/supabase-js");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

// Initialize Supabase client
const supabase = createClient(
  process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_URL ||
    "https://macguoyqxeijpszqwvbm.supabase.co",
  process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hY2d1b3lxeGVpanBzenF3dmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxODQyODYsImV4cCI6MjA1ODc2MDI4Nn0.jtNSW59CnPNgNMWvhG6drk7ft2YilUATeMyfAI6YKgs"
);

// Initialize Firebase Admin
try {
  // Try to use the service account key file
  const serviceAccount = require(path.join(process.cwd(), "serviceAccountKey.json"));
  
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://rivalswaitlist-default-rtdb.firebaseio.com"
  });
  
  console.log("Firebase Admin initialized with service account key");
} catch (error) {
  console.error("Firebase initialization error:", error);
  process.exit(1);
}

const db = getFirestore();

async function migrateData() {
  console.log("Starting migration from Supabase to Firebase...");
  
  try {
    // Get all users from Supabase
    const { data: users, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("id", { ascending: true });
      
    if (error) {
      console.error("Error fetching users from Supabase:", error);
      return;
    }
    
    console.log(`Found ${users.length} users to migrate`);
    
    // Process in batches to avoid Firestore limits
    const batchSize = 500; // Firestore allows max 500 operations per batch
    
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = db.batch();
      const currentBatch = users.slice(i, i + batchSize);
      
      console.log(`Processing batch ${Math.floor(i/batchSize) + 1} (${currentBatch.length} users)...`);
      
      for (const user of currentBatch) {
        const docRef = db.collection("waitlist").doc();
        batch.set(docRef, {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          referral_code: user.referral_code,
          referred_by: user.referred_by,
          position_boost: user.position_boost || 0,
          preferred_console: user.preferred_console,
          birthday: user.birthday,
          created_at: new Date(), // You might want to preserve original timestamps if available
        });
      }
      
      await batch.commit();
      console.log(`Batch ${Math.floor(i/batchSize) + 1} committed successfully`);
    }
    
    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Error during migration:", err);
  }
}

migrateData().catch(console.error); 