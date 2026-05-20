import { useEffect, useState } from 'react';
import api from '../services/api.js';
import PageHeader from '../components/PageHeader.jsx';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', deadline: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/projects');
      setProjects(response.data);
    };
    load().catch(console.error);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/projects', form);
      setProjects((prev) => [response.data, ...prev]);
      setForm({ title: '', description: '', deadline: '' });
      setMessage('Project created successfully');
    } catch (error) {
      setMessage(error.message || 'Failed to create project');
    }
  };

  return (
    <div>
      <PageHeader title="Projects" subtitle="Create, assign and track project work." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-white">New project</h3>
          <p className="mt-2 text-sm text-slate-400">Admins can create projects and invite team members.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {message && <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-200">{message}</div>}
            <input
              type="text"
              placeholder="Project title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
              required
            />
            <textarea
              placeholder="Project description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
              rows="4"
            />
            <input
              type="date"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
            />
            <button className="w-full rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Create project
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{project.description || 'No description yet.'}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">{project.status}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
                <span>Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'N/A'}</span>
                <span>Members: {project.members?.length ?? 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
