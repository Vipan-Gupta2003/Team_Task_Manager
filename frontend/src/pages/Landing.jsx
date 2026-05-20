import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),_radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%),_rgb(15,23,42)] text-slate-100">
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm uppercase tracking-[0.35em] text-sky-300">Team Collaboration</span>
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">Manage teams, projects and tasks with confidence.</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">A modern task manager built for fast-moving teams. Track project progress, assign work, and review analytics from one secure workspace.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/signup" className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-sky-400">
              Start free trial
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-3xl border border-slate-700 px-8 py-4 text-base text-slate-100 transition hover:border-slate-500">
              Login
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-card">
          <div className="grid gap-5">
            <div className="rounded-3xl bg-slate-950/80 p-6">
              <h2 className="text-xl font-semibold">Quick project summary</h2>
              <p className="mt-3 text-slate-400">Launch a project, add teammates, assign tasks and watch your team hit each milestone.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Projects</p>
                <p className="mt-3 text-3xl font-semibold text-white">12</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Tasks</p>
                <p className="mt-3 text-3xl font-semibold text-white">48</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
