import { useMemo, useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import ReportForm from "./components/ReportForm";
import ReportTable from "./components/ReportTable";

const initialReports = [
  {
    id: crypto.randomUUID(),
    title: "Build login page",
    assignee: "Ayu",
    team: "Frontend",
    status: "Done",
    progress: 100,
    date: "2025-01-15",
    notes: "Shipped with responsive layout.",
  },
  {
    id: crypto.randomUUID(),
    title: "Auth API integration",
    assignee: "Bima",
    team: "Backend",
    status: "In Progress",
    progress: 60,
    date: "2025-01-16",
    notes: "Token refresh pending.",
  },
  {
    id: crypto.randomUUID(),
    title: "E2E tests for onboarding",
    assignee: "Citra",
    team: "QA",
    status: "Blocked",
    progress: 20,
    date: "2025-01-17",
    notes: "Waiting for staging env.",
  },
];

export default function App() {
  const [view, setView] = useState("teams"); // "teams" | "individual"
  const [reports, setReports] = useState(initialReports);
  const [selectedAssignee, setSelectedAssignee] = useState("");

  const visibleReports = useMemo(() => reports, [reports]);

  const handleAdd = (report) => {
    setReports((prev) => [report, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Header view={view} setView={setView} />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <SummaryCards reports={visibleReports} />

        <div className="grid gap-6 lg:grid-cols-3" role="region" aria-label="Add and view reports">
          <div className="lg:col-span-1">
            <ReportForm onAdd={handleAdd} />
          </div>
          <div className="lg:col-span-2">
            <ReportTable
              reports={visibleReports}
              view={view}
              selectedAssignee={selectedAssignee}
              setSelectedAssignee={setSelectedAssignee}
            />
          </div>
        </div>

        <footer className="pt-4 text-center text-sm text-gray-600">
          Simple, readable interface for ages 30–80: clear labels, large touch targets, and high contrast.
        </footer>
      </main>
    </div>
  );
}
