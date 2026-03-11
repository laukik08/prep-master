require('dotenv').config();
const supabase = require('./config/supabaseClient');

async function checkAptitudeSchema() {
  const { data, error } = await supabase.from('aptitude_questions').select('*').limit(1);
  if (error) {
    console.error('Error fetching aptitude_questions:', error);
    return;
  }
  if (data && data.length > 0) {
    console.log('Columns in aptitude_questions table:', Object.keys(data[0]));
    console.log('Sample data:', data[0]);
  } else {
    console.log('No questions found. Try inserting one to see error, or use RPC.');
    
    const { error: insertErr } = await supabase.from('aptitude_questions').insert({
      question: "Test",
      options: ["A", "B", "C", "D"],
      correct_answer: 0,
      category: "Logical",
      difficulty: "Easy"
    });
    if (insertErr) {
      console.log("Insert constraint error:", insertErr);
    } else {
      console.log("Insert succeeded.");
    }
  }
}

checkAptitudeSchema();
