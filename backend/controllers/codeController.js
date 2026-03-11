const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// POST /api/code/run
exports.run = async (req, res, next) => {
  try {
    const { language, code, input } = req.body;

    if (!language || !code) {
      return res.status(400).json({ error: 'Language and code are required.' });
    }

    const supportedLanguages = ['javascript', 'python', 'cpp', 'c'];

    if (!supportedLanguages.includes(language.toLowerCase())) {
      return res.status(400).json({ 
        error: `Unsupported language: ${language}. Supported: ${supportedLanguages.join(', ')}` 
      });
    }

    // Create a temp file for the code
    const tmpDir = os.tmpdir();
    const timestamp = Date.now();
    let filename, command, args;

    switch (language.toLowerCase()) {
      case 'javascript':
        filename = path.join(tmpDir, `prepmaster_${timestamp}.js`);
        fs.writeFileSync(filename, code);
        command = 'node';
        args = [filename];
        break;

      case 'python':
        filename = path.join(tmpDir, `prepmaster_${timestamp}.py`);
        fs.writeFileSync(filename, code);
        command = 'python';
        args = [filename];
        break;

      case 'cpp':
      case 'c':
        return res.json({
          stdout: '',
          stderr: `C/C++ compilation requires a local compiler (g++). Please install MinGW or Visual Studio Build Tools.`,
          exitCode: 1,
          executionTime: '0ms',
          status: 'Error'
        });

      default:
        return res.status(400).json({ error: 'Unsupported language.' });
    }

    const startTime = Date.now();

    // Execute with a 5-second timeout
    execFile(command, args, { 
      timeout: 5000, 
      maxBuffer: 1024 * 1024,
      stdin: input || undefined
    }, (error, stdout, stderr) => {
      const executionTime = Date.now() - startTime;

      // Clean up temp file
      try { fs.unlinkSync(filename); } catch (_) {}

      if (error) {
        // Timeout
        if (error.killed) {
          return res.json({
            stdout: stdout || '',
            stderr: 'Time Limit Exceeded (5s)',
            exitCode: 1,
            executionTime: `${executionTime}ms`,
            status: 'TLE'
          });
        }

        // Runtime error
        return res.json({
          stdout: stdout || '',
          stderr: stderr || error.message,
          exitCode: error.code || 1,
          executionTime: `${executionTime}ms`,
          status: 'Error'
        });
      }

      res.json({
        stdout: stdout || '',
        stderr: stderr || '',
        exitCode: 0,
        executionTime: `${executionTime}ms`,
        status: 'Success'
      });
    });

  } catch (err) {
    console.error('Code execution error:', err);
    next(err);
  }
};
