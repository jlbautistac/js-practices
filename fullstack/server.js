const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// ------- Example Route -------
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ------- Routes -------

// GET all tasks
app.get('/api/tasks/', async (req, res) => {
  try {
    const tasks = await db.query("SELECT * FROM tasks");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET an specific task
app.get('/api/tasks/:id', (req, res) => {});

// POST create a new task
app.post('/api/tasks/', (req, res) => {});

// PUT update a specific task
app.put('/api/tasks/:id', (req, res) => {});

// DELETE a specific task
app.delete('/api/tasks/:id', (req, res) => {});


// ------- Execute server -------

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
