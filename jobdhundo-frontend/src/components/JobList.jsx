import JobCard from "./JobCard";

export default function JobList({ jobs, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-52 bg-surface rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center text-text-muted py-20">
        No jobs found yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {jobs.map((job, idx) => (
        <JobCard key={job.id || idx} job={job} />
      ))}
    </div>
  );
}





