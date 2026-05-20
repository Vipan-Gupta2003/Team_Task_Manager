import { useAuth } from '../context/AuthContext.jsx';
import PageHeader from '../components/PageHeader.jsx';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title="Profile" subtitle="View your account details and role information." />
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Name</p>
            <p className="text-lg font-medium text-white">{user.name}</p>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</p>
            <p className="text-lg font-medium text-white">{user.email}</p>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Role</p>
            <p className="text-lg font-medium text-white">{user.role}</p>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Member since</p>
            <p className="text-lg font-medium text-white">Account created securely.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
