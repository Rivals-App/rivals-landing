export const config = {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY!,
};

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error("Missing required Supabase environment variables");
}
