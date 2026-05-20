import Project from '../models/Project.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

export const createProject = async (req, res) => {
  const { title, description, deadline } = req.body;
  if (!title) return res.status(400).json({ message: 'Project title is required' });

  const project = await Project.create({
    title,
    description,
    deadline,
    admin: req.user._id,
    members: [req.user._id],
  });

  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { members: req.user._id };
  const projects = await Project.find(filter).populate('admin', 'name email').populate('members', 'name email');
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('admin', 'name email')
    .populate('members', 'name email');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (req.user.role !== 'admin' && !project.members.some((member) => member._id.equals(req.user._id))) {
    return res.status(403).json({ message: 'Access denied' });
  }
  const tasks = await Task.find({ project: project._id }).populate('assignedTo', 'name email');
  res.json({ ...project.toObject(), tasks });
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!project.admin.equals(req.user._id)) return res.status(403).json({ message: 'Only project admin can update' });

  const { title, description, deadline, status } = req.body;
  project.title = title || project.title;
  project.description = description ?? project.description;
  project.deadline = deadline || project.deadline;
  project.status = status || project.status;

  await project.save();
  res.json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!project.admin.equals(req.user._id)) return res.status(403).json({ message: 'Only project admin can delete' });

  await Task.deleteMany({ project: project._id });
  await project.deleteOne();

  res.json({ message: 'Project deleted successfully' });
};

export const addMember = async (req, res) => {
  const { email } = req.body;
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!project.admin.equals(req.user._id)) return res.status(403).json({ message: 'Only project admin can add members' });

  const member = await User.findOne({ email });
  if (!member) return res.status(404).json({ message: 'Member not found' });
  if (project.members.includes(member._id)) {
    return res.status(400).json({ message: 'Member already added' });
  }

  project.members.push(member._id);
  await project.save();
  res.json({ message: 'Member added successfully', member: { id: member._id, name: member.name, email: member.email } });
};
