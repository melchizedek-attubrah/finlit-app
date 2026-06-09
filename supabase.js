import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mvrraigkueqiyixgipby.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12cnJhaWdrdWVxaXlpeGdpcGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NTE2MDYsImV4cCI6MjA5NjUyNzYwNn0.J1E-S0ndZD0s7vKJokEVyFTvLgjEuXezOnRcqPjntUM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);