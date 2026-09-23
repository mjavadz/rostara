import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xshzqngsdhezoqrityqv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaHpxbmdzZGhlenFyaXR5cXYiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDgxOTM2MCwiZXhwIjoyMDUwMzk1MzYwfQ.XJ741x837r61V5uW9r_6aJ58S78v-43_Hl3s46y0oIo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
