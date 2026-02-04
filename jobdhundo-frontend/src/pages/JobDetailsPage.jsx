import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Building, Clock, Briefcase, Share2, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";

export default function JobDetailsPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    // Fallback if accessed directly (though typically we need state for full Adzuna details)
    const job = state?.job;

    if (!job) {
        return (
            <div className="min-h-screen bg-bg text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Job details not found</h2>
                    <button
                        onClick={() => navigate("/jobs")}
                        className="px-6 py-3 glass-button-primary rounded-xl font-bold"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    const handleApply = () => {
        window.open(job.redirect_url, "_blank");
    };



    return (
        <div className="min-h-screen bg-bg text-text-main pb-24">
            <Navbar />

            {/* Hero Header */}
            <div className="relative pt-12 pb-24 px-6 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary-900/20 to-bg pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Jobs
                    </button>

                    <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500" />

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Company Logo / Initial */}
                            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                                <span className="text-3xl font-bold text-primary-400">
                                    {job.company.display_name.charAt(0)}
                                </span>
                            </div>

                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                                    {job.title}
                                </h1>

                                <div className="flex flex-wrap gap-y-2 gap-x-6 text-slate-400 text-sm mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Building size={16} className="text-primary-400" />
                                        {job.company.display_name}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={16} className="text-primary-400" />
                                        {job.location.display_name}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={16} className="text-primary-400" />
                                        {new Date(job.created).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase size={16} className="text-primary-400" />
                                        {job.contract_time ? job.contract_time.replace('_', ' ') : 'Full Time'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-card p-8 rounded-3xl border border-white/5 bg-surface/50">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                About the Role
                            </h2>
                            <div
                                className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                        </div>
                    </div>

                    {/* Right Column: Key Details Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-3xl border border-white/5 sticky top-24">
                            <h3 className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-4">
                                Overview
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <p className="text-xs text-slate-500 mb-1">Salary</p>
                                    <p className="text-white font-semibold">
                                        {job.salary_min ? `£${job.salary_min}` : "Competitive"}
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <p className="text-xs text-slate-500 mb-1">Job Type</p>
                                    <p className="text-white font-semibold capitalize">
                                        {job.contract_type || "Permanent"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: job.title,
                                            text: `Check out this ${job.title} role at ${job.company.display_name}`,
                                            url: job.redirect_url
                                        }).catch(console.error);
                                    } else {
                                        // Fallback to copy link
                                        navigator.clipboard.writeText(job.redirect_url);
                                        alert("Link copied to clipboard!");
                                    }
                                }}
                                className="w-full mt-6 py-3 border border-white/10 rounded-xl text-slate-300 text-sm font-semibold hover:bg-white/5 flex items-center justify-center gap-2 transition-all"
                            >
                                <Share2 size={16} /> Share Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Apply Bar */}
            <div className="fixed bottom-0 inset-x-0 bg-bg/80 backdrop-blur-xl border-t border-white/10 p-4 z-50">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <h3 className="text-white font-bold">{job.title}</h3>
                        <p className="text-slate-400 text-xs">{job.company.display_name}</p>
                    </div>

                    <div className="flex w-full sm:w-auto gap-3">


                        <button
                            onClick={handleApply}
                            className="flex-1 sm:flex-none px-8 py-3 glass-button-primary rounded-xl text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2"
                        >
                            Apply on Company Site <ExternalLink size={16} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
