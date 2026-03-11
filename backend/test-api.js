const axios = require('axios');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const token = jwt.sign({ userId: 'test-admin-id', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

async function test() {
  try {
    const res = await axios.post('http://localhost:5000/api/aptitude', {
      question: "What is 2+2?",
      options: ["3", "4", "5", "6"],
      correct_answer: 1,
      category: "Quantitative",
      difficulty: "Easy"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error creating aptitude question:");
    console.error(err.response ? err.response.data : err.message);
  }

  try {
    const res2 = await axios.post('http://localhost:5000/api/companies', {
      name: "Test Corp",
      industry: "Tech",
      description: "Test",
      logo_url: "url",
      aptitude_question_count: 0,
      coding_problem_count: 0
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Success:", res2.data);
  } catch (err) {
    console.error("Error creating company:");
    console.error(err.response ? err.response.data : err.message);
  }
}

test();
