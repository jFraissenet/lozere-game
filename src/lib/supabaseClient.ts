import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
const url: string = process.env.SUPABASE_URL!;
const anon: string = process.env.SUPABASE_ANON!;
export const supabase = createClient<Database>(
  "https://ubysoacorqowiyuumzeu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieXNvYWNvcnFvd2l5dXVtemV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTI2NzksImV4cCI6MjAxNTU2ODY3OX0.sv8RO39Ksyvsmh2S-1lt7U7Kcp2bdDIt0HgInc9Abdk"
);
