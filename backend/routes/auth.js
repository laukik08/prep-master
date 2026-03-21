const router = require('express').Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

// Validation middleware
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  body('role').optional().isIn(['admin', 'student']).withMessage('Role must be admin or student.'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

// Validation handler
const validate = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);

const passwordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required.'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters.'),
];

router.put('/password', authMiddleware, passwordValidation, validate, authController.changePassword);

// ─── OAuth Routes ─────────────────────────────────────
const oauthController = require('../controllers/oauthController');

router.get('/oauth/google', oauthController.googleRedirect);
router.get('/oauth/google/callback', oauthController.googleCallback);
router.get('/oauth/github', oauthController.githubRedirect);
router.get('/oauth/github/callback', oauthController.githubCallback);

module.exports = router;
