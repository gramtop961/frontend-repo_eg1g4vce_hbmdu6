import { Users, User, BarChart3 } from "lucide-react";

export default function Header({ view, setView }) {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-blue-600" aria-hidden="true" />
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Dev Task Reports
          </h1>
        </div>
        <nav className="flex gap-2" aria-label="Primary">
          <button
            onClick={() => setView("teams")}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              view === "teams"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-pressed={view === "teams"}
          >
            <Users className="w-4 h-4" aria-hidden="true" /> All Teams
          </button>
          <button
            onClick={() => setView("individual")}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              view === "individual"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-pressed={view === "individual"}
          >
            <User className="w-4 h-4" aria-hidden="true" /> Individual
          </button>
        </nav>
      </div>
    </header>
  );
}
