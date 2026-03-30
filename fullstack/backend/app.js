const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Task Manager API is running.' });
});

app.use('/api/tasks', taskRoutes);

module.exports = app;