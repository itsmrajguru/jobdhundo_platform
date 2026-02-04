import { Building2, MapPin, Briefcase } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 flex flex-col justify-between">
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
            <MapPin size={14} />{" "}
            {job.location?.display_name?.split(",")[0]}
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
  );
}
