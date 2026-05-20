import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../services/api.js';
import DashboardCard from '../components/DashboardCard.jsx';
import PageHeader from '../components/PageHeader.jsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const [statsResponse, analyticsResponse] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/analytics'),
      ]);
      setStats(statsResponse.data);
      setAnalytics(analyticsResponse.data);
    };
    loadDashboard().catch(console.error);
  }, []);

  const statusData = analytics?.tasksByStatus ?? [];
  const priorityData = analytics?.tasksByPriority ?? [];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Team overview and task performance." />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Projects" value={stats?.totalProjects ?? '--'} />
        <DashboardCard title="Tasks" value={stats?.totalTasks ?? '--'} />
        <DashboardCard title="Completed" value={stats?.completedTasks ?? '--'} accent="text-emerald-400" />
        <DashboardCard title="Overdue" value={stats?.overdueTasks ?? '--'} accent="text-rose-400" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-white">Tasks by Status</h3>
          <div className="mt-6">
            <Doughnut
              data={{
                labels: statusData.map((item) => item._id),
                datasets: [{ data: statusData.map((item) => item.count), backgroundColor: ['#38bdf8', '#facc15', '#34d399', '#f87171'] }],
              }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-white">Tasks by Priority</h3>
          <div className="mt-6">
            <Bar
              data={{
                labels: priorityData.map((item) => item._id),
                datasets: [{ label: 'Count', data: priorityData.map((item) => item.count), backgroundColor: ['#60a5fa', '#f59e0b', '#ef4444'] }],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
        <h3 className="text-lg font-semibold text-white">Project progress</h3>
        <div className="mt-6 space-y-4">
          {analytics?.projectProgress?.map((project) => (
            <div key={project._id} className="space-y-2 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-slate-100">{project.title}</p>
                <span className="text-sm text-slate-400">{project.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-sky-500" style={{ width: `${project.progress ?? 0}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
