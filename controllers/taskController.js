const Task = require('../models/taskModel');

// Get tasks only for the logged-in user
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  const newTask = new Task({
    title,
    description,
    dueDate,
    priority,
    user: req.user._id   // ✅ add this
  });

  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
};

// Update task only if it belongs to user
const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    return res.status(404).json({ message: 'Task not found or unauthorized' });
  }

  Object.assign(task, req.body);
  const updatedTask = await task.save();
  res.json(updatedTask);
};

// Delete task only if it belongs to user
const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!task) {
    return res.status(404).json({ message: 'Task not found or unauthorized' });
  }

  res.json({ message: 'Task deleted' });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
