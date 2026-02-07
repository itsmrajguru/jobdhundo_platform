import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SignupPage Mounted");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting signup form...");
    setError("");
    setLoading(true);
    try {
      const data = await signupUser({ username, password });
      console.log("Signup response:", data);
      if (data && data.message === "Account created successfully") {
        navigate("/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden text-white">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-800/50 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-2xl font-bold text-white tracking-tight">
              Job<span className="text-purple-500">Dhundo</span>
            </span>
            <p className="text-slate-400 mt-1 text-sm">Sign up to find your next opportunity.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">Username</label>
              <input
                type="text"
                name="username"
                className="w-full bg-black/20 border border-white/10 p-3.5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Choose a username"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full bg-black/20 border border-white/10 p-3.5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-8 text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
