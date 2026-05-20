import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const getStats = async (req, res) => {
  const totalProjects = await Project.countDocuments();
  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ status: 'Completed' });
  const pendingTasks = await Task.countDocuments({ status: { $in: ['Todo', 'In Progress'] } });
  const overdueTasks = await Task.countDocuments({ status: 'Overdue' });

  res.json({ totalProjects, totalTasks, completedTasks, pendingTasks, overdueTasks });
};

export const getAnalytics = async (req, res) => {
  const tasksByStatus = await Task.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  const tasksByPriority = await Task.aggregate([
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);
  const projectProgress = await Project.find({}, 'title progress').lean();

  res.json({ tasksByStatus, tasksByPriority, projectProgress });
};
