import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords must match');
      return;
    }

    try {
      await signup({ name: data.name, email: data.email, password: data.password });
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-card">
        <h1 className="text-3xl font-semibold">Create your team workspace</h1>
        <p className="mt-3 text-slate-400">Sign up and start managing projects with your team.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {error && <p className="rounded-2xl bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Full name</span>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              />
              {errors.name && <span className="text-rose-400">{errors.name.message}</span>}
            </label>
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
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              />
              {errors.password && <span className="text-rose-400">{errors.password.message}</span>}
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Confirm password</span>
              <input
                type="password"
                {...register('confirmPassword', { required: 'Confirm your password' })}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
              />
              {errors.confirmPassword && <span className="text-rose-400">{errors.confirmPassword.message}</span>}
            </label>
          </div>
          <button className="w-full rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Create account
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-sky-400 hover:text-sky-300">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
