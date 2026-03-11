const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function addColumns() {
  // Use raw SQL via supabase-js (requires service role key)
  const queries = [
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin TEXT",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS github TEXT"
  ];

  for (const sql of queries) {
    const { error } = await supabase.from('users').select('id').limit(0);
    // We can't run raw DDL via PostgREST, so we'll try a different approach
  }

  // Alternatively, try updating with the new fields - if they don't exist, we'll get an error
  const { data, error } = await supabase
    .from('users')
    .update({ phone: null, linkedin: null, github: null })
    .eq('id', '00000000-0000-0000-0000-000000000000'); // Dummy ID

  if (error && error.code === '42703') {
    console.log('Columns do not exist. Please add them via Supabase Dashboard SQL Editor:');
    console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;');
    console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin TEXT;');
    console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS github TEXT;');
  } else {
    console.log('Columns already exist or update succeeded.');
  }
}

addColumns();
