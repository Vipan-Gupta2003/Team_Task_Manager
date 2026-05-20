const PageHeader = ({ title, subtitle }) => (
  <div className="mb-8 flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900 p-6">
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
    {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
  </div>
);

export default PageHeader;
