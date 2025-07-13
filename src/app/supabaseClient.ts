import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfhjbmvnvlmcsnmsmoja.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmaGpibXZudmxtY3NubXNtb2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MDc1NDAsImV4cCI6MjA2Nzk4MzU0MH0.B4eY71T2PZYBrSIy_0gcs8z5M4GU4-fOH0VZaMcx4Rk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 