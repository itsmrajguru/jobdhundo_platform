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
      const data = await getJobs(q);
      setJobs(data.jobs || []);
    } catch {
      setError("Unable to reach the career server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text-main">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-surface to-bg border-b border-border py-16 pt-6 pb-1 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Your next career move starts here
          </h1>
          <p className="text-text-muted text-lg mb-10">
            Discover verified roles from high-growth companies.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchJobs(query);
            }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              className="w-full pl-14 pr-36 py-5 rounded-2xl border border-border shadow-soft focus:ring-4 focus:ring-primary-500/20 outline-none text-base"
              placeholder="Job title, company, or keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="absolute right-3 top-3 bottom-3 px-7 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-95 transition">
              Search
            </button>
          </form>
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
          <JobList jobs={jobs.slice(0, 6)} loading={loading} />
        )}
      </main>
    </div>
  );
}
