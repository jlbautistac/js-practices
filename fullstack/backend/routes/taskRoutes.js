const express = require('express');
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/tasksController');
const {
    validateId,
    validateTaskBody,
    validateIsCompleted
} = require('../middlewares/taskValidation');

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', validateId, getTaskById);
router.post('/', validateTaskBody, createTask);
router.put('/:id', validateId, validateTaskBody, validateIsCompleted, updateTask);
router.delete('/:id', validateId, deleteTask);

module.exports = router;