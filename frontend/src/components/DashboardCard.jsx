const DashboardCard = ({ title, value, description, accent }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-card">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className={`mt-4 text-3xl font-semibold ${accent || 'text-white'}`}>{value}</p>
      {description && <p className="mt-2 text-sm text-slate-400">{description}</p>}
    </div>
  );
};

export default DashboardCard;
