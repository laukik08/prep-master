const { execFile, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const supabase = require('../config/supabaseClient');

// ─── Helper: execute code with given stdin input ─────────────
function executeCode(command, args, input, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const child = spawn(command, args, {
      timeout: timeoutMs,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });

    // Write stdin input if provided
    if (input) {
      child.stdin.write(input);
    }
    child.stdin.end();

    child.on('close', (code) => {
      const executionTime = Date.now() - startTime;
      resolve({ stdout: stdout.trim(), stderr: stderr.trim(), exitCode: code, executionTime });
    });

    child.on('error', (err) => {
      const executionTime = Date.now() - startTime;
      if (err.message.includes('ETIMEDOUT') || err.killed) {
        resolve({ stdout: '', stderr: 'Time Limit Exceeded (5s)', exitCode: 1, executionTime, tle: true });
      } else {
        resolve({ stdout: '', stderr: err.message, exitCode: 1, executionTime });
      }
    });

    // Force kill after timeout
    setTimeout(() => {
      if (child.exitCode === null) {
        child.kill('SIGKILL');
        resolve({ stdout: stdout.trim(), stderr: 'Time Limit Exceeded (5s)', exitCode: 1, executionTime: timeoutMs, tle: true });
      }
    }, timeoutMs + 500);
  });
}

// ─── Helper: create temp file for code ───────────────────────
function createTempFile(language, code) {
  const tmpDir = os.tmpdir();
  const ts = Date.now() + '_' + Math.random().toString(36).slice(2);

  switch (language.toLowerCase()) {
    case 'javascript':
      const jsFile = path.join(tmpDir, `pm_${ts}.js`);
      fs.writeFileSync(jsFile, code);
      return { filename: jsFile, command: 'node', args: [jsFile] };

    case 'python':
      const pyFile = path.join(tmpDir, `pm_${ts}.py`);
      fs.writeFileSync(pyFile, code);
      return { filename: pyFile, command: 'python', args: [pyFile] };

    default:
      return null;
  }
}

// ─── POST /api/code/run  (Run Only — no verdict) ────────────
exports.run = async (req, res, next) => {
  try {
    const { language, code, input } = req.body;

    if (!language || !code) {
      return res.status(400).json({ error: 'Language and code are required.' });
    }

    const setup = createTempFile(language, code);
    if (!setup) {
      return res.status(400).json({ error: `Unsupported language: ${language}. Supported: javascript, python` });
    }

    const result = await executeCode(setup.command, setup.args, input || '');

    // Cleanup
    try { fs.unlinkSync(setup.filename); } catch (_) {}

    res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      executionTime: `${result.executionTime}ms`,
      status: result.tle ? 'TLE' : (result.exitCode === 0 ? 'Success' : 'Error')
    });
  } catch (err) {
    console.error('Code run error:', err);
    next(err);
  }
};

// ─── POST /api/code/submit  (Run against test cases → Verdict) ─
exports.submit = async (req, res, next) => {
  try {
    const { language, code, problem_id } = req.body;
    const user_id = req.user.userId;

    if (!language || !code || !problem_id) {
      return res.status(400).json({ error: 'language, code, and problem_id are required.' });
    }

    // Fetch problem + test cases
    const { data: problem, error: pErr } = await supabase
      .from('problems')
      .select('id, title, test_cases, example_input, example_output')
      .eq('id', problem_id)
      .single();

    if (pErr || !problem) {
      return res.status(404).json({ error: 'Problem not found.' });
    }

    // Build test cases array from both structured test_cases AND the legacy example fields
    let testCases = [];
    
    if (problem.test_cases && Array.isArray(problem.test_cases) && problem.test_cases.length > 0) {
      testCases = problem.test_cases;
    }
    
    // If no structured test cases, fall back to example_input/example_output
    if (testCases.length === 0 && problem.example_input && problem.example_output) {
      testCases = [{ input: problem.example_input, expected_output: problem.example_output }];
    }

    if (testCases.length === 0) {
      return res.status(400).json({ error: 'No test cases found for this problem. Please ask admin to add test cases.' });
    }

    const setup = createTempFile(language, code);
    if (!setup) {
      return res.status(400).json({ error: `Unsupported language: ${language}` });
    }

    // Run code against each test case
    const results = [];
    let allPassed = true;
    let totalTime = 0;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const result = await executeCode(setup.command, setup.args, tc.input || '');
      totalTime += result.executionTime;

      const actual = result.stdout.trim();
      const expected = (tc.expected_output || '').trim();
      const passed = result.exitCode === 0 && actual === expected;

      if (!passed) allPassed = false;

      results.push({
        test_case: i + 1,
        passed,
        input: tc.input || '',
        expected_output: expected,
        actual_output: actual,
        stderr: result.stderr || '',
        execution_time: `${result.executionTime}ms`,
        status: result.tle ? 'TLE' : (result.exitCode !== 0 ? 'Runtime Error' : (passed ? 'Passed' : 'Wrong Answer'))
      });
    }

    // Cleanup temp file
    try { fs.unlinkSync(setup.filename); } catch (_) {}

    // Determine final verdict
    let verdict = 'Accepted';
    if (!allPassed) {
      const firstFail = results.find(r => !r.passed);
      verdict = firstFail?.status === 'TLE' ? 'Time Limit Exceeded' :
                firstFail?.status === 'Runtime Error' ? 'Runtime Error' : 'Wrong Answer';
    }

    // Save submission to DB
    const { error: sErr } = await supabase.from('submissions').insert({
      user_id,
      problem_id,
      language,
      code,
      verdict: verdict === 'Time Limit Exceeded' ? 'Wrong Answer' : verdict,
      execution_time: `${totalTime}ms`
    });

    if (sErr) console.error('Submission save error:', sErr);

    res.json({
      verdict,
      total_tests: testCases.length,
      tests_passed: results.filter(r => r.passed).length,
      total_time: `${totalTime}ms`,
      test_results: results
    });

  } catch (err) {
    console.error('Code submit error:', err);
    next(err);
  }
};
