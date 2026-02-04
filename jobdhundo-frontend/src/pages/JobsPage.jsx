import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import JobList from "../components/JobList";
import { getJobs } from "../api";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [locationFilter, setLocationFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  useEffect(() => {
    setQuery(initialQuery);
    fetchJobs(initialQuery, currentPage, locationFilter, companyFilter);
  }, [initialQuery, currentPage, locationFilter, companyFilter]);

  async function fetchJobs(q, page, location = "", company = "") {
    setLoading(true);
    setError("");
    try {
      let urlQuery = q;
      if (location) urlQuery += ` location:${location}`;
      if (company) urlQuery += ` company:${company}`;

      const data = await getJobs(urlQuery, page, jobsPerPage);
      setJobs(data.jobs || []);
      setTotalJobs(data.count || 0);
    } catch {
      setError("Unable to fetch jobs.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 for new search
    fetchJobs(query, 1, locationFilter, companyFilter);
    navigate(`/jobs?q=${encodeURIComponent(query)}`);
  };

  // Server-side pagination means we display all fetched jobs directly
  const currentJobs = jobs;
  // Cap at 10 pages maximum to keep loading low as requested
  const totalPages = Math.min(Math.ceil(totalJobs / jobsPerPage), 10);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="min-h-screen bg-bg text-text-main">
      <Navbar />

      {/* Hero Section (Merged form Dashboard) */}
      <div className="mx-4 mt-4 rounded-3xl bg-gradient-to-b from-surface to-bg border border-white/5 py-12 px-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto relative z-10">

          {/* Dotted Line Box Content */}
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 md:p-12 bg-white/5 backdrop-blur-sm text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
              Find Jobs That Actually Match Your Skills
            </h1>
            <p className="text-slate-400 text-base mb-8 max-w-xl mx-auto">
              Search verified jobs, track applications, and build your resume — all in one place.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
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

            {/* Filters - Moved inside the dotted box for a cleaner look or just below */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm focus:bg-white/10 outline-none"
              >
                <option value="" className="bg-slate-900">All Locations</option>
                <option value="Remote" className="bg-slate-900">Remote</option>
                <option value="New York" className="bg-slate-900">New York</option>
                <option value="San Francisco" className="bg-slate-900">San Francisco</option>
                <option value="London" className="bg-slate-900">London</option>
              </select>

              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm focus:bg-white/10 outline-none"
              >
                <option value="" className="bg-slate-900">All Companies</option>
                <option value="Google" className="bg-slate-900">Google</option>
                <option value="Microsoft" className="bg-slate-900">Microsoft</option>
                <option value="Amazon" className="bg-slate-900">Amazon</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {error ? (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
            {error}
          </div>
        ) : (
          <>
            <JobList jobs={currentJobs} loading={loading} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-border bg-surface hover:bg-bg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-border bg-surface hover:bg-bg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
