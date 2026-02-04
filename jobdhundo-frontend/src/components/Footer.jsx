import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* Brand & Copyright */}
                <div className="flex items-center gap-4">
                    <Link to="/home" className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                            <span className="text-white text-[10px]">J</span>
                        </div>
                        JobDhundo
                    </Link>
                    <p className="text-slate-600 text-[10px] hidden sm:block">
                        © {new Date().getFullYear()}
                    </p>
                </div>

                {/* Minimal Social Icons */}
                <div className="flex items-center gap-3">
                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={14} /></a>
                    <a href="#" className="text-slate-500 hover:text-[#0077b5] transition-colors"><Linkedin size={14} /></a>
                    <a href="#" className="text-slate-500 hover:text-[#1DA1F2] transition-colors"><Twitter size={14} /></a>
                    <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors"><Mail size={14} /></a>
                </div>

            </div>
        </footer>
    );
}
