import { CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export default function ResumeAnalysis({ analysis }) {
    if (!analysis) return null;

    const { score, skills_found, missing_keywords } = analysis;

    // Determine score color
    const getScoreColor = (s) => {
        if (s >= 75) return "text-green-400 border-green-500";
        if (s >= 50) return "text-yellow-400 border-yellow-500";
        return "text-red-400 border-red-500";
    };

    return (
        <div className="space-y-6">
            {/* Score Card */}
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center ${getScoreColor(score)} shadow-[0_0_30px_rgba(0,0,0,0.3)] bg-surface`}>
                        <span className="text-4xl font-black tracking-tighter">{score}</span>
                        <span className="absolute -bottom-3 text-[10px] font-bold uppercase tracking-widest bg-bg px-3 py-1 rounded-full border border-white/10 text-slate-300">
                            ATS Score
                        </span>
                    </div>

                    <div className="text-center md:text-left space-y-2">
                        <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                            Overview <Sparkles size={18} className="text-yellow-400" />
                        </h3>
                        <p className="text-slate-400 max-w-md leading-relaxed">
                            {score >= 75 ? "Excellent! Your resume is optimized for ATS systems." :
                                score >= 50 ? "Good foundation, but adding more specific keywords could boost your visibility." :
                                    "Your resume might be missed by automated systems. Try adding the suggested skills below."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Found Skills */}
                <div className="glass-panel p-6 rounded-3xl border border-white/5">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                        <CheckCircle size={16} className="text-green-400" /> Detected Skills
                    </h4>
                    {skills_found && skills_found.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {skills_found.map((skill) => (
                                <span key={skill} className="px-3 py-1.5 rounded-lg bg-green-500/5 border border-green-500/20 text-green-300 text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500 text-sm italic border border-dashed border-white/10 rounded-xl">
                            No technical skills detected yet.
                        </div>
                    )}
                </div>

                {/* Missing Keywords */}
                <div className="glass-panel p-6 rounded-3xl border border-white/5">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                        <AlertCircle size={16} className="text-yellow-400" /> Recommended Additions
                    </h4>
                    {missing_keywords && missing_keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {missing_keywords.map((kw) => (
                                <span key={kw} className="px-3 py-1.5 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-yellow-300 text-sm font-medium opacity-90">
                                    + {kw}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500 text-sm italic border border-dashed border-white/10 rounded-xl">
                            Great coverage! No major keywords missing.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
