import { useEffect, useState } from 'react';
import api from '../services/api.js';
import PageHeader from '../components/PageHeader.jsx';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const loadTasks = async () => {
      const response = await api.get('/tasks');
      setTasks(response.data);
    };
    loadTasks().catch(console.error);
  }, []);

  const filtered = tasks.filter((task) => statusFilter === 'All' || task.status === statusFilter);

  return (
    <div>
      <PageHeader title="Tasks" subtitle="Manage assignments, update statuses and stay on schedule." />
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">My tasks</h3>
            <p className="mt-1 text-sm text-slate-400">Filter by status or view all open work.</p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
          >
            {['All', 'Todo', 'In Progress', 'Completed', 'Overdue'].map((status) => (
              <option value={status} key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mt-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-6 text-slate-400">No tasks match this view.</div>
          ) : (
            filtered.map((task) => (
              <div key={task._id} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{task.title}</h4>
                    <p className="text-sm text-slate-400">{task.project?.title || 'Unlinked project'}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                    <span className="rounded-full bg-slate-800 px-3 py-1">{task.status}</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1">{task.priority}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-400">{task.description || 'No description available.'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
