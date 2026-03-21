const router = require('express').Router();
const aptitudeController = require('../controllers/aptitudeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Student routes
router.get('/', authMiddleware, aptitudeController.getAll);
router.post('/submit', authMiddleware, aptitudeController.submit);

// Admin routes
router.post('/', authMiddleware, roleMiddleware('admin'), aptitudeController.create);
router.put('/:id', authMiddleware, roleMiddleware('admin'), aptitudeController.update);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), aptitudeController.remove);
router.post('/bulk', authMiddleware, roleMiddleware('admin'), aptitudeController.bulkImport);

module.exports = router;
