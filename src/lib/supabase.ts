import { createClient } from '@supabase/supabase-js';

// These would normally be in .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type for the API keys table in Supabase
export type ApiKeyRecord = {
  id: string;
  name: string;
  value: string;
  usage: number;
  created_at: string;
  last_used?: string | null;
  type?: 'dev' | 'prod';
  user_id?: string | null;
  limit?: number;
}; 