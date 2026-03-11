require('dotenv').config();
const bcrypt = require('bcryptjs');
const supabase = require('./config/supabaseClient');

async function createAccounts() {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // 1. Create Admin
    const { data: admin, error: adminErr } = await supabase
      .from('users')
      .upsert({
        name: 'Admin User',
        email: 'admin@test.com',
        password: hashedPassword,
        role: 'admin',
        college: 'Test University',
        branch: 'Computer Science',
        graduation_year: 2025
      }, { onConflict: 'email' })
      .select();

    if (adminErr) throw adminErr;
    console.log('✅ Admin account created: admin@test.com (password: password123)');

    // 2. Create Student
    const { data: student, error: studentErr } = await supabase
      .from('users')
      .upsert({
        name: 'Student User',
        email: 'student@test.com',
        password: hashedPassword,
        role: 'student',
        college: 'Test College',
        branch: 'Information Technology',
        graduation_year: 2026
      }, { onConflict: 'email' })
      .select();

    if (studentErr) throw studentErr;
    console.log('✅ Student account created: student@test.com (password: password123)');

  } catch (err) {
    console.error('❌ Error creating accounts:', err);
  }
}

createAccounts();
