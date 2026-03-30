const db = require('../config/db');

const getDatabaseErrorMessage = (error) => {
    return error.message || error.code || error.sqlMessage || 'Database error';
};

const getAllTasks = async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM tasks');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);

        if (tasks.length === 0) {
            return res.status(404).json({ error: `Task with id ${id} not found.` });
        }

        res.json(tasks[0]);
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const createTask = async (req, res) => {
    const query = 'INSERT INTO tasks(title, priority, isCompleted) VALUES(?, ?, ?)';
    const { title, priority } = req.body;

    try {
        const [result] = await db.query(query, [title.trim(), priority, false]);
        res.status(201).json({
            id: result.insertId,
            title: title.trim(),
            priority,
            isCompleted: false
        });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, priority, isCompleted } = req.body;
    const query = 'UPDATE tasks SET title = ?, priority = ?, isCompleted = ? WHERE id = ?';

    try {
        const [result] = await db.query(query, [title.trim(), priority, isCompleted, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Task with id ${id} not found.` });
        }

        res.json({
            id: Number(id),
            title: title.trim(),
            priority,
            isCompleted
        });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Task with id ${id} not found.` });
        }

        res.json({ message: `Task with id ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};