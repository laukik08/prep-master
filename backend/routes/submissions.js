const router = require('express').Router();
const submissionsController = require('../controllers/submissionsController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, submissionsController.create);
router.get('/', authMiddleware, submissionsController.getMySubmissions);

module.exports = router;
