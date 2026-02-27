const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// ------- Routes -------

// GET all tasks
app.get('api/tasks/', (req, res) => {});

// GET an specific task
app.get('api/tasks/:id', (req, res) => {});

// POST create a new task
app.post('api/tasks/', (req, res) => {});

// PUT update a specific task
app.put('api/tasks/:id', (req, res) => {});

// DELETE a specific task
app.delete('api/tasks/:id', (req, res) => {});


// ------- Execute server -------

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
