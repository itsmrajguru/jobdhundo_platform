import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import JobList from "../components/JobList";
import { getJobs } from "../api";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
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
    fetchJobs(initialQuery, locationFilter, companyFilter);
  }, [initialQuery, locationFilter, companyFilter]);

  async function fetchJobs(q, location = "", company = "") {
    setLoading(true);
    setError("");
    try {
      // assuming backend supports query params for location & company
      let urlQuery = q;
      if (location) urlQuery += ` location:${location}`;
      if (company) urlQuery += ` company:${company}`;
      const data = await getJobs(urlQuery);
      setJobs(data.jobs || []);
      setCurrentPage(1); // reset page when new data loads
    } catch {
      setError("Unable to fetch jobs.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(query, locationFilter, companyFilter);
    navigate(`/jobs?q=${encodeURIComponent(query)}`);
  };

  // Pagination slice
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="min-h-screen bg-bg text-text-main">
      <Navbar />

      {/* Hero / Search */}
      <div className="bg-gradient-to-b from-surface to-bg border-b border-border py-16 pt-6 pb-1 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Explore Jobs
          </h1>
          <p className="text-text-muted text-lg mb-10">
            Find the perfect role for your skills.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
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

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-surface"
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
                <option value="London">London</option>
              </select>
            </div>
            <div>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-surface"
              >
                <option value="">All Companies</option>
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Amazon">Amazon</option>
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
