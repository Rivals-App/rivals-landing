import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  //  process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_URL ||
    "https://cgmmlkzaovsuzkpluksh.supabase.co",
  //  process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbW1sa3phb3ZzdXprcGx1a3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODQyMjksImV4cCI6MjA1Njk2MDIyOX0.MAvRFXCcs03rGyJOGEQA9NhmnGuYquyXd3Q5_w0JLDA"
);

export async function POST(req: Request) {
  try {
    console.log("Check email API called");
    const { email } = await req.json();
    console.log("Checking email:", email);

    // Use a simpler query that just checks if the email exists
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("email", email);
    
    if (error) {
      console.error("Error checking for email:", error);
      throw error;
    }
    
    console.log("Email exists count:", count);

    // If email exists (count > 0), return 409 Conflict
    if (count && count > 0) {
      console.log("Email exists, returning 409");
      return NextResponse.json(
        { 
          exists: true,
          error: "This email is already registered on our waitlist. Please use a different email address.",
          message: "This email is already registered on our waitlist." 
        }, 
        { status: 409 }
      );
    }

    // If email doesn't exist, return 200 OK
    console.log("Email doesn't exist, returning 200");
    return NextResponse.json({ exists: false }, { status: 200 });
  } catch (error) {
    console.error("Error in check-email API:", error);
    return NextResponse.json(
      { error: "Error checking email" },
      { status: 500 }
    );
  }
}
