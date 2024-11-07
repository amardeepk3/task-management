const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { taskValidator } = require('../validators/taskValidators');

router.post('/', protect, validate(taskValidator), taskController.createTask);
router.get('/', protect, taskController.getTasks);
router.put('/:id', protect, validate(taskValidator), taskController.updateTask);
router.delete('/:id', protect, taskController.deleteTask);
router.get('/filter', protect, taskController.filterTaskByStatus);


module.exports = router;
