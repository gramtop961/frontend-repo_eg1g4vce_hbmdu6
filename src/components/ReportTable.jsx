import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function ReportTable({ reports, view, selectedAssignee, setSelectedAssignee }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return reports
      .filter((r) =>
        view === "individual" ? r.assignee.toLowerCase().includes(selectedAssignee.toLowerCase()) : true
      )
      .filter((r) => (status === "All" ? true : r.status === status))
      .filter((r) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.assignee.toLowerCase().includes(q) ||
          r.team.toLowerCase().includes(q)
        );
      });
  }, [reports, query, status, view, selectedAssignee]);

  const uniqueAssignees = useMemo(
    () => Array.from(new Set(reports.map((r) => r.assignee))).sort(),
    [reports]
  );

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-4" aria-label="Report list">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, person, or team"
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Search reports"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Filter by status"
          >
            <option>All</option>
            <option>In Progress</option>
            <option>Done</option>
            <option>Blocked</option>
          </select>
          {view === "individual" && (
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Select assignee"
            >
              <option value="">Choose person…</option>
              {uniqueAssignees.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-700">
            <tr>
              <th className="px-3 py-2 font-medium">Date</th>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">Assignee</th>
              <th className="px-3 py-2 font-medium">Team</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Progress</th>
              <th className="px-3 py-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{r.date || "—"}</td>
                <td className="px-3 py-2 text-gray-900 font-medium min-w-[14rem]">{r.title}</td>
                <td className="px-3 py-2 text-gray-700">{r.assignee}</td>
                <td className="px-3 py-2 text-gray-700">{r.team}</td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      r.status === "Done"
                        ? "bg-emerald-100 text-emerald-800"
                        : r.status === "Blocked"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2 w-40">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden" aria-label="Progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={r.progress}>
                    <div className="h-full bg-blue-600" style={{ width: `${r.progress}%` }} />
                  </div>
                  <span className="sr-only">{r.progress}%</span>
                </td>
                <td className="px-3 py-2 text-gray-700 max-w-[20rem] truncate" title={r.notes}>
                  {r.notes || ""}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-gray-600">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
