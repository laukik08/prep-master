const router = require('express').Router();
const companiesController = require('../controllers/companiesController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, companiesController.getAll);
router.post('/', authMiddleware, roleMiddleware('admin'), companiesController.create);
router.put('/:id', authMiddleware, roleMiddleware('admin'), companiesController.update);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), companiesController.remove);

module.exports = router;
