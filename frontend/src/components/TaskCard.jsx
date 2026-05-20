import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/app/projects/${task.project?._id || ''}`)}
      className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-600"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{task.priority}</span>
      </div>
      <p className="mt-3 text-sm text-slate-400">{task.description || 'No description available.'}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
        <span>Assigned to: {task.assignedTo?.name || 'Unassigned'}</span>
        <span>Status: {task.status}</span>
      </div>
    </button>
  );
};

export default TaskCard;
