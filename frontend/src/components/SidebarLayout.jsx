import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { label: 'Dashboard', path: '/app' },
  { label: 'Projects', path: '/app/projects' },
  { label: 'Tasks', path: '/app/tasks' },
  { label: 'Profile', path: '/app/profile' },
];

const SidebarLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="lg:flex lg:min-h-screen">
        <aside className="w-full bg-slate-900 p-6 lg:w-72">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold tracking-tight">Team Task Manager</h1>
            <p className="mt-2 text-sm text-slate-400">Collaborate, track, and deliver on time.</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
            <p className="text-xs uppercase text-slate-500">Logged in as</p>
            <p className="mt-2 font-medium">{user.name}</p>
            <p className="text-sm text-slate-400">{user.role}</p>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-600"
            >
              Sign out
            </button>
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
