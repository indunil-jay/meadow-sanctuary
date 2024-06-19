import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hjpuxcgpdgdzcqzgnxdm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcHV4Y2dwZGdkemNxemdueGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2OTM2MjgsImV4cCI6MjAzNDI2OTYyOH0.avBKI4TMiVxKOKoZuRGdA6r5i-6yjlZmM77voF2xjhg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
