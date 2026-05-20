import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-card">
        <h1 className="text-3xl font-semibold">Sign in to Team Task Manager</h1>
        <p className="mt-3 text-slate-400">Use your team account to manage projects and tasks.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {error && <p className="rounded-2xl bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Email</span>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              />
              {errors.email && <span className="text-rose-400">{errors.email.message}</span>}
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Password</span>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              />
              {errors.password && <span className="text-rose-400">{errors.password.message}</span>}
            </label>
          </div>
          <button className="w-full rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Continue
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Don&apos;t have an account? <Link to="/signup" className="text-sky-400 hover:text-sky-300">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
