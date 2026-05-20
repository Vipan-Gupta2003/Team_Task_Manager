import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import PageHeader from '../components/PageHeader.jsx';
import TaskCard from '../components/TaskCard.jsx';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        setError(err.message || 'Unable to load project');
      }
    };
    loadProject();
  }, [id]);

  return (
    <div>
      <PageHeader title="Project details" subtitle="Review the project summary and assigned tasks." />
      {error && <p className="rounded-3xl border border-rose-500 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>}
      {project ? (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                <p className="mt-3 text-slate-400">{project.description}</p>
              </div>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Admin: {project.admin?.name}</p>
                <p>Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'None'}</p>
                <p>Members: {project.members?.length ?? 0}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
              <h3 className="text-lg font-semibold text-white">Project team</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                {project.members?.map((member) => (
                  <li key={member._id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-slate-400">{member.email}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
              <h3 className="text-lg font-semibold text-white">Tasks</h3>
              <div className="mt-5 space-y-4">
                {project.tasks?.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-400 shadow-card">Loading project details...</div>
      )}
    </div>
  );
};

export default ProjectDetails;
