import { Pencil, Trash2, Quote, Briefcase, GraduationCap, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResumeCard({ profile, onEdit, onDelete }) {
  const navigate = useNavigate();
  if (!profile) return null;

  const skills = profile.skills ? profile.skills.split(",") : [];

  const handlePersonalizedSearch = () => {
    // Redirect to jobs page with domain as query
    const query = profile.domain || profile.skills || "";
    navigate(`/jobs?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden w-full max-w-lg relative group transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 flex flex-col">
      {/* Decorative Top Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 to-purple-500" />

      <div className="p-8 flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">{profile.full_name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-primary-400 text-xs font-semibold uppercase tracking-widest">Candidate Profile</p>
              {profile.domain && <span className="text-slate-500 text-xs">• {profile.domain}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Edit Profile"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Delete Profile"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Summary */}
          <section className="relative pl-6 border-l-2 border-primary-500/30">
            <Quote size={24} className="absolute -left-3 -top-2 text-primary-500 bg-surface p-0.5 rounded-full" />
            <p className="text-slate-300 text-sm italic leading-relaxed">
              "{profile.summary}"
            </p>
          </section>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-6">
            <section>
              <h4 className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider mb-2">
                <Briefcase size={14} className="text-primary-400" /> Experience
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{profile.work}</p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider mb-2">
                <GraduationCap size={14} className="text-primary-400" /> Education
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed border-l border-white/10 pl-3">
                {profile.education}
              </p>
            </section>
          </div>

          {/* Skills */}
          <section>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 pt-6 border-t border-white/5">
              Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:scale-105 transition-transform cursor-default"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Personalized Search Button */}
      <div className="p-4 bg-white/5 border-t border-white/5">
        <button
          onClick={handlePersonalizedSearch}
          className="w-full py-4 glass-button-primary rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-sm shadow-xl shadow-primary-500/20 group transform transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Search size={18} className="text-white group-hover:scale-110 transition-transform" />
          Search Personalized Results
        </button>
      </div>

    </div>
  );
}