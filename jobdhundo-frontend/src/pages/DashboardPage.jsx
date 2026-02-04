import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getJobs } from "../api";
import Navbar from "../components/Navbar";
import JobList from "../components/JobList";

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchJobs("");
  }, []);

  async function fetchJobs(q) {
    setLoading(true);
    setError("");
    try {
      const data = await getJobs(q, 1, 10); // Fetch page 1, limit 10
      setJobs(data.jobs || []);
    } catch {
      setError("Unable to reach the career server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text-main pb-20">
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
      <div className="mx-4 mt-4 rounded-3xl bg-gradient-to-b from-surface to-bg border border-white/5 py-12 px-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl mx-auto relative z-10">

          {/* Dotted Line Box Content */}
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 md:p-12 bg-white/5 backdrop-blur-sm text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
              Find Jobs That Actually Match Your Skills
            </h1>
            <p className="text-slate-400 text-base mb-8 max-w-xl mx-auto">
              Search verified jobs, track applications, and build your resume — all in one place.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchJobs(query);
              }}
              className="relative max-w-lg mx-auto"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 opacity-80" size={18} />
              <input
                className="w-full pl-10 pr-28 py-3 rounded-xl glass-input focus:ring-2 focus:ring-primary-500/50 text-sm shadow-lg border-white/10"
                placeholder="Job title, company, or keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-lg glass-button-primary text-xs font-bold active:scale-95 transition-all shadow-none hover:shadow-md">
                Search
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold">Latest Opportunities</h3>
          <button
            onClick={() => navigate(`/jobs?q=${encodeURIComponent(query)}`)}
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            View all jobs →
          </button>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
            {error}
          </div>
        ) : (
          <JobList jobs={jobs} loading={loading} />
        )}
      </main>
    </div>
  );
}
