import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required." });
    }

    try {
      const { data, error } = await supabase
        .from("waitlist")
        .insert([{ name, email }]);

      if (error) {
        throw error;
      }

      return res.status(201).json({ success: true, data });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving to Supabase:", error.message);
        return res.status(500).json({ error: error.message });
      } else {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
