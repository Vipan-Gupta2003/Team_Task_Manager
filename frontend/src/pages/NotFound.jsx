import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-16 text-center shadow-card">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">404 error</p>
      <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-slate-400">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-3xl bg-sky-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
        Return home
      </Link>
    </div>
  </div>
);

export default NotFound;
