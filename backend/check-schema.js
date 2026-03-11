require('dotenv').config();
const supabase = require('./config/supabaseClient');

async function checkSchema() {
  const { data, error } = await supabase.from('problems').select('*').limit(1);
  if (error) {
    console.error('Error fetching problems:', error);
    return;
  }
  if (data && data.length > 0) {
    console.log('Columns in problems table:', Object.keys(data[0]));
  } else {
    console.log('No problems found to inspect schema, inserting a dummy one is required or use RPC/SQL.');
  }
}

checkSchema();
