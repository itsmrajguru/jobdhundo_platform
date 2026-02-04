import { Link } from "react-router-dom";

export default function HomePage() {
  const raw = localStorage.getItem("user");
  let username = "there";
  try {
    const u = raw ? JSON.parse(raw) : null;
    if (u && u.username) username = u.username;
  } catch (e) {
    // ignore JSON errors
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-bg px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-40 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-50"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="glass-card p-12 text-center border-white/10">
          <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              Job<span className="text-primary-500">Dhundo</span>
            </span>
          </div>

          <h2 className="text-2xl font-medium text-primary-200 mb-2">Hey, {username}!</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            The future of your career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">starts here.</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover verified roles from high-growth companies. Join thousands of developers finding their dream jobs today.
          </p>

          <div className="flex justify-center">
            <Link to="/dashboard" className="px-8 py-4 glass-button-primary rounded-xl text-lg font-bold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all">
              Explore Opportunities →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

}
