import { useState } from "react";
import { UploadCloud, FileText, Loader2, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import ResumeAnalysis from "../components/ResumeAnalysis";
import { uploadResume } from "../api";

export default function ResumePage() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError("");
            setAnalysis(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError("");

        try {
            const data = await uploadResume(file);
            setAnalysis(data.analysis);
        } catch (err) {
            console.error(err);
            setError("Failed to parse resume. Please ensure it's a valid PDF.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg text-text-main pb-20 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="fixed -top-40 -left-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        ATS<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400"> Checker</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Upload your resume to check your ATS score, identify missing skills, and get instant feedback to improve your job applications.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Upload Section - Takes full width if no analysis, else 1/3 */}
                    <div className={`lg:col-span-${analysis ? "1" : "3"} transition-all duration-500`}>
                        <div className="glass-card p-1 rounded-3xl">
                            <div className="bg-bg/50 rounded-[22px] p-8 border border-white/5">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    id="resume-upload"
                                    className="hidden"
                                />

                                <label
                                    htmlFor="resume-upload"
                                    className={`cursor-pointer flex flex-col items-center justify-center gap-6 p-8 rounded-2xl border-2 border-dashed transition-all duration-300 group
                                        ${file
                                            ? "border-primary-500/50 bg-primary-500/5"
                                            : "border-white/10 hover:border-primary-500/30 hover:bg-white/5"
                                        }`}
                                >
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
                                        ${file
                                            ? "bg-primary-500/20 shadow-glow"
                                            : "bg-surface border border-white/5 group-hover:scale-105"
                                        }`}>
                                        {file ? (
                                            <FileText size={32} className="text-primary-400" />
                                        ) : (
                                            <UploadCloud size={32} className="text-slate-400 group-hover:text-primary-400" />
                                        )}
                                    </div>

                                    <div className="text-center space-y-2">
                                        <h3 className="text-lg font-bold text-white">
                                            {file ? "Resume Selected" : "Upload Resume"}
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            {file ? file.name : "Drag & drop or click to browse (PDF)"}
                                        </p>
                                    </div>

                                    {file && !analysis && (
                                        <div className="flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                                            <CheckCircle2 size={12} /> Ready to analyze
                                        </div>
                                    )}
                                </label>

                                {file && !analysis && (
                                    <button
                                        onClick={handleUpload}
                                        disabled={uploading}
                                        className="w-full mt-6 glass-button-primary py-4 rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
                                    >
                                        {uploading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" /> Analyzing...
                                            </>
                                        ) : (
                                            "Run Smart Analysis"
                                        )}
                                    </button>
                                )}

                                {error && (
                                    <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Analysis Results - Takes 2/3 width */}
                    {analysis && (
                        <div className="lg:col-span-2 animate-fade-in-right">
                            <ResumeAnalysis analysis={analysis} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
