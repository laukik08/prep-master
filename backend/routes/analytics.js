const router = require('express').Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Student progress
router.get('/users/progress', authMiddleware, analyticsController.studentProgress);

// User profile
router.get('/users/profile', authMiddleware, analyticsController.getProfile);
router.put('/users/profile', authMiddleware, analyticsController.updateProfile);

// Admin stats
router.get('/admin/stats', authMiddleware, roleMiddleware('admin'), analyticsController.adminStats);

// Admin users list
router.get('/admin/users', authMiddleware, roleMiddleware('admin'), analyticsController.adminUsers);

module.exports = router;
