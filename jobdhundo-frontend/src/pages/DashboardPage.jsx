import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Briefcase, Filter } from "lucide-react";
import { getJobs } from "../api";
import Navbar from "../components/Navbar";

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
      const token = localStorage.getItem("token") || "";
      const data = await getJobs(q, token);
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

      {/* Hero */}
      <div className="bg-gradient-to-b from-surface to-bg border-b border-border py-16 pt-6 pb-1 px-6 ">
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

      <main className="max-w-7xl mx-auto p-8 ">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold">
            {query ? `Results for "${query}"` : "Featured Opportunities"}
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface hover:bg-bg">
            <Filter size={14} /> Filters
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-52 bg-surface rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, idx) => (
              <div
                key={job.id || idx}
                className="bg-surface border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                    <Building2 size={22} className="text-primary-600" />
                  </div>

                  <h4 className="font-bold text-lg mb-2">{job.title}</h4>

                  <div className="text-sm text-text-muted flex gap-4 mb-4">
                    <span className="flex items-center gap-1">
                      <Building2 size={14} /> {job.company?.display_name || "Company"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location?.display_name?.split(",")[0]}
                    </span>
                  </div>

                  <p className="text-sm text-text-muted line-clamp-3">
                    {job.description?.replace(/<[^>]*>/g, "")}
                  </p>
                </div>

                <a
                  href={job.redirect_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-text-main text-white hover:bg-neutral-800 transition"
                >
                  View Details <Briefcase size={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
