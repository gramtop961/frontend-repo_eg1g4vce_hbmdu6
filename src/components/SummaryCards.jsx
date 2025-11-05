export default function SummaryCards({ reports }) {
  const total = reports.length;
  const completed = reports.filter((r) => r.status === "Done").length;
  const inProgress = reports.filter((r) => r.status === "In Progress").length;
  const blocked = reports.filter((r) => r.status === "Blocked").length;
  const avgProgress = total
    ? Math.round(
        reports.reduce((acc, r) => acc + (Number(r.progress) || 0), 0) / total
      )
    : 0;

  const cards = [
    { label: "Total Tasks", value: total, color: "bg-blue-50 text-blue-700" },
    { label: "Completed", value: completed, color: "bg-emerald-50 text-emerald-700" },
    { label: "In Progress", value: inProgress, color: "bg-amber-50 text-amber-700" },
    { label: "Blocked", value: blocked, color: "bg-rose-50 text-rose-700" },
  ];

  return (
    <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`${c.color} rounded-xl p-4 border border-gray-200/60`}
          role="group"
        >
          <div className="text-sm text-gray-600">{c.label}</div>
          <div className="mt-1 text-2xl font-semibold">{c.value}</div>
        </div>
      ))}
      <div className="col-span-full lg:col-span-4 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Average Progress</p>
          <p className="text-sm font-medium text-gray-900">{avgProgress}%</p>
        </div>
        <div className="mt-2 h-3 w-full bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={avgProgress}>
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${avgProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
