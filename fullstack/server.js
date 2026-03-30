const express = require('express');
const db = require('./db');
const cors = require('cors'); // CORS = Cross-Origin Resource Sharing

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());

// ------- Example Route -------
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ------- Validation Middlewares -------

const VALID_PRIORITIES = ['low', 'medium', 'high'];

const validateId = (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'El parámetro "id" debe ser un número entero positivo.' });
    }
    next();
};

const validateTaskBody = (req, res, next) => {
    const { title, priority } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'El campo "title" es requerido y no puede estar vacío.' });
    }

    if (!priority || !VALID_PRIORITIES.includes(priority)) {
        return res.status(400).json({ error: `El campo "priority" debe ser uno de: ${VALID_PRIORITIES.join(', ')}.` });
    }

    next();
};

const validateIsCompleted = (req, res, next) => {
    const { isCompleted } = req.body;
    if (typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: 'El campo "isCompleted" debe ser un booleano.' });
    }
    next();
};

// ------- Routes -------

// GET all tasks
app.get('/api/tasks/', async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET an specific task
app.get('/api/tasks/:id', validateId, async (req, res) => {
  const { id } = req.params;
  try {
    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json(task[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new task
app.post('/api/tasks/', validateTaskBody, async (req, res) => {
  const query = "INSERT INTO tasks(title, priority, isCompleted) VALUES(?, ?, ?)";
  const { title, priority } = req.body;
  try {
    const [result] = await db.query(query, [title, priority, false]);
    res.status(201).json({ id: result.insertId, title, priority, isCompleted: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a specific task
app.put('/api/tasks/:id', validateId, validateTaskBody, validateIsCompleted, async (req, res) => {
  const { id } = req.params;
  const { title, priority, isCompleted } = req.body;
  try{
    const query = "UPDATE tasks SET title = ?, priority = ?, isCompleted = ? WHERE id = ?";
    const [result] = await db.query(query,[title, priority, isCompleted, id]);
    res.json({ id, title, priority, isCompleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

;})

// DELETE a specific task
app.delete('/api/tasks/:id', validateId, async (req, res) => {
  const { id } = req.params;
  try{
    const query = "DELETE FROM tasks WHERE id = ?";
    const [result] = await db.query(query, [id]);
    res.json({ message: `Task with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ------- Execute server -------

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
