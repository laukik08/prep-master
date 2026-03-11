const router = require('express').Router();
const problemsController = require('../controllers/problemsController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Student routes (authenticated)
router.get('/', authMiddleware, problemsController.getAll);
router.get('/:id', authMiddleware, problemsController.getById);

// Admin routes
router.post('/', authMiddleware, roleMiddleware('admin'), problemsController.create);
router.put('/:id', authMiddleware, roleMiddleware('admin'), problemsController.update);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), problemsController.remove);
router.post('/bulk', authMiddleware, roleMiddleware('admin'), problemsController.bulkImport);

module.exports = router;
