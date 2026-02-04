import { Building2, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  return (
    <div className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 group cursor-pointer" onClick={handleViewDetails}>
      <div>
        <h4 className="font-bold text-lg mb-2 text-white group-hover:text-primary-200 transition-colors line-clamp-1">{job.title}</h4>

        <div className="text-xs text-slate-400 flex flex-col gap-1.5 mb-4 font-medium">
          <span className="flex items-center gap-1.5">
            <Building2 size={14} className="text-primary-500/70" /> {job.company?.display_name || "Company"}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary-500/70" />{" "}
            {job.location?.display_name?.split(",")[0]}
          </span>
        </div>

        <p className="text-xs text-slate-400/80 line-clamp-3 leading-relaxed mb-4">
          {job.description?.replace(/<[^>]*>/g, "")}
        </p>
      </div>

      <button
        className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-primary-600 hover:border-primary-500 transition-all group-hover:shadow-lg w-full"
      >
        View Details <Briefcase size={14} />
      </button>
    </div>
  );
}
