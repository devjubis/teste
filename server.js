const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const tasks = [
  { id: 1, title: "Aprender React", completed: true },
  { id: 2, title: "Estudar NodeJS", completed: false },
  { id: 3, title: "Praticar TypeScript", completed: false }
];

let nextTaskId = 4;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/', (req, res) => {
  res.send('Página inicial');
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  const id = nextTaskId; 
  nextTaskId++; 
  newTask.id = id; 
  tasks.push(newTask);
  res.json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`O servidor está em execução http://localhost:${port}`);
});
