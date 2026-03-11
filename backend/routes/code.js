const router = require('express').Router();
const codeController = require('../controllers/codeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/run', authMiddleware, codeController.run);

module.exports = router;
