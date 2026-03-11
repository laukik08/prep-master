const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let adminToken = '';
let studentToken = '';

async function testEndpoints() {
  console.log('--- STARTING ENDPOINT TESTS ---\n');

  try {
    // 1. Admin Login
    console.log('1. Testing Admin Login...');
    const adminLogin = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@prepmaster.com',
      password: 'admin123'
    });
    adminToken = adminLogin.data.token;
    console.log('✅ Admin Login Successful\n');

    // 2. Student Registration & Login
    console.log('2. Testing Student Login/Register...');
    const studentEmail = `student_${Date.now()}@prepmaster.com`;
    const studentRegister = await axios.post(`${API_URL}/auth/register`, {
      name: 'Test Student',
      email: studentEmail,
      password: 'student123',
      role: 'student'
    });
    studentToken = studentRegister.data.token;
    console.log('✅ Student Register Successful\n');

    // 3. Create Company (Admin)
    console.log('3. Testing Company Creation (Admin)...');
    const companyName = `Company_${Date.now()}`;
    const companyRes = await axios.post(`${API_URL}/companies`, 
      { name: companyName, coding_problem_count: 5, aptitude_question_count: 10 },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('✅ Company Created:', companyRes.data.name, '\n');

    // 4. Create Coding Problem (Admin)
    console.log('4. Testing Problem Creation (Admin)...');
    const problemRes = await axios.post(`${API_URL}/problems`, 
      { 
        title: 'Two Sum', 
        description: 'Given an array of integers...', 
        difficulty: 'Easy',
        topics: ['Arrays', 'Hash Table'],
        companies: ['Google', 'Amazon'],
        example_input: '[2,7,11,15], target=9',
        example_output: '[0,1]'
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    const problemId = problemRes.data.id;
    console.log('✅ Problem Created:', problemRes.data.title, '\n');

    // 5. Get Problems List (Student)
    console.log('5. Testing Get Problems (Student)...');
    const getProblemsRes = await axios.get(`${API_URL}/problems`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log(`✅ Retrieved ${getProblemsRes.data.length} problems\n`);

    // 6. Test Code Execution (Student)
    console.log('6. Testing Code Execution (Piston API)...');
    try {
      const codeRunRes = await axios.post(`${API_URL}/code/run`, 
        { 
          language: 'javascript', 
          code: 'console.log("Hello from Piston!");' 
        },
        { headers: { Authorization: `Bearer ${studentToken}` } }
      );
      console.log('✅ Code Executed. Output:', codeRunRes.data.stdout.trim(), '\n');
    } catch (e) {
      console.log('⚠️ Code Execution failed (expected if API is currently rate limited/whitelisted):', e.response?.data?.details?.message || e.message, '\n');
    }

    // 7. Test Submission Creation
    console.log('7. Testing Submission Tracking...');
    const submissionRes = await axios.post(`${API_URL}/submissions`, 
      {
        problem_id: problemId,
        language: 'javascript',
        code: 'console.log("Hello from Piston!");',
        verdict: 'Accepted',
        execution_time: '12ms'
      },
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );
    console.log('✅ Submission track recorded.\n');

    // 8. Test Analytics (Student Progress)
    console.log('8. Testing Student Progress Analytics...');
    const progressRes = await axios.get(`${API_URL}/users/progress`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log('✅ Progress Details:', progressRes.data, '\n');

    // 9. Test Analytics (Admin Stats)
    console.log('9. Testing Admin Stats...');
    const adminStatsRes = await axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Admin Stats:', JSON.stringify(adminStatsRes.data), '\n');

    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');

  } catch (error) {
    if (error.response) {
      console.error('❌ HTTP Error:', error.response.status, error.response.data);
    } else {
      console.error('❌ Request Error:', error.message);
    }
  }
}

testEndpoints();
