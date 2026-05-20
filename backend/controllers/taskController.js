import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const createTask = async (req, res) => {
  const { title, description, assignedTo, project, priority, dueDate } = req.body;
  if (!title || !project) return res.status(400).json({ message: 'Task title and project are required' });

  const task = await Task.create({
    title,
    description,
    assignedTo,
    project,
    priority,
    dueDate,
    createdBy: req.user._id,
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { assignedTo: req.user._id };
  const tasks = await Task.find(filter)
    .populate('assignedTo', 'name email')
    .populate('project', 'title')
    .populate('createdBy', 'name email');
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedTo', 'name email')
    .populate('project', 'title')
    .populate('createdBy', 'name email')
    .populate('comments.user', 'name email');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && task.assignedTo && !task.assignedTo._id.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && task.createdBy && !task.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Only creator or admin can update task' });
  }

  const { title, description, assignedTo, priority, status, dueDate } = req.body;
  task.title = title || task.title;
  task.description = description ?? task.description;
  task.assignedTo = assignedTo || task.assignedTo;
  task.priority = priority || task.priority;
  if (status) task.status = status;
  task.dueDate = dueDate || task.dueDate;

  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && task.createdBy && !task.createdBy.equals(req.user._id)) {
    return res.status(403).json({ message: 'Only creator or admin can delete task' });
  }
  await task.deleteOne();
  res.json({ message: 'Task deleted successfully' });
};

export const patchTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'Status is required' });
  if (req.user.role !== 'admin' && task.assignedTo && !task.assignedTo.equals(req.user._id)) {
    return res.status(403).json({ message: 'Only assigned user can update status' });
  }
  task.status = status;
  await task.save();
  res.json(task);
};

export const addTaskComment = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment text is required' });
  task.comments.push({ user: req.user._id, text });
  await task.save();
  res.json(await task.populate('comments.user', 'name email'));
};
