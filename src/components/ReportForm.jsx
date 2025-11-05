import { useState } from "react";
import { FilePlus } from "lucide-react";

const defaultForm = {
  title: "",
  assignee: "",
  team: "",
  status: "In Progress",
  progress: 0,
  date: "",
  notes: "",
};

export default function ReportForm({ onAdd }) {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "progress" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignee || !form.team) return;
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm(defaultForm);
  };

  return (
    <section aria-label="Add report" className="bg-white rounded-xl border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FilePlus className="w-5 h-5 text-blue-600" aria-hidden="true" /> Add Report
      </h2>
      <form onSubmit={handleSubmit} className="mt-3 grid gap-3 md:grid-cols-2" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm text-gray-700">Task Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g., Implement login API"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="assignee" className="text-sm text-gray-700">Assignee</label>
          <input
            id="assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g., Sinta"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="team" className="text-sm text-gray-700">Team</label>
          <input
            id="team"
            name="team"
            value={form.team}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g., Frontend"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option>In Progress</option>
            <option>Done</option>
            <option>Blocked</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="progress" className="text-sm text-gray-700">Progress (%)</label>
          <input
            id="progress"
            name="progress"
            type="range"
            min={0}
            max={100}
            value={form.progress}
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-sm text-gray-700" aria-live="polite">{form.progress}%</div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm text-gray-700">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label htmlFor="notes" className="text-sm text-gray-700">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Additional context or blockers"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FilePlus className="w-4 h-4" aria-hidden="true" /> Save Report
          </button>
        </div>
      </form>
    </section>
  );
}
