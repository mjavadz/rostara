import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xshzqngsdhezoqrityqv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaHpxbmdzZGhlem9xcml0eXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDUxOTcsImV4cCI6MjA3OTgyMTE5N30.8aHen11izZO3jrQ0p2m_xLz2aeJkVLdyj1SqdZcoiIo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
