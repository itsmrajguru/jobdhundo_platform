import { Pencil, Trash2 } from "lucide-react";

export default function ResumeCard({ profile, onEdit, onDelete }) {
  if (!profile) return null;

  const skills = profile.skills ? profile.skills.split(",") : [];

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 w-full max-w-lg relative">
      <div className="h-2 bg-[#10b981] w-full" />
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-800 uppercase tracking-tighter">{profile.full_name}</h2>
            <div className="w-12 h-1 bg-[#10b981] mt-2"></div>
          </div>
          <div className="flex gap-2">
            <button onClick={onEdit} className="p-2 text-gray-400 hover:text-[#10b981] transition-colors">
              <Pencil size={20} />
            </button>
            <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="text-[#10b981] text-xs font-black uppercase tracking-widest mb-1">Professional Profile</h4>
            <p className="text-gray-600 italic leading-relaxed text-sm">"{profile.summary}"</p>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <section>
              <h4 className="text-gray-800 text-xs font-black uppercase mb-1">Experience</h4>
              <p className="text-gray-500 text-sm">{profile.work}</p>
            </section>
            <section>
              <h4 className="text-gray-800 text-xs font-black uppercase mb-1">Education</h4>
              <p className="text-gray-500 text-sm">{profile.education}</p>
            </section>
          </div>

          <section>
            <h4 className="text-gray-800 text-xs font-black uppercase mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}