import { Link } from "react-router-dom"; // Add import

// ...

<div className="text-center mt-8 text-sm text-slate-400">
  Don't have an account?{" "}
  <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
    Create Account
  </Link>
</div>

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      if (data.access) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-10">
          <div className="text-center mb-6">
            <span className="text-2xl font-bold text-white tracking-tight">
              Job<span className="text-primary-500">Dhundo</span>
            </span>
            <p className="text-slate-400 mt-1 text-sm">Welcome back! Please login to continue.</p>
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
                className="glass-input p-3.5 focus:ring-2 focus:ring-primary-500/50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter your username"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">Password</label>
              <input
                type="password"
                name="password"
                className="glass-input p-3.5 focus:ring-2 focus:ring-primary-500/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 rounded-xl glass-button-primary flex items-center justify-center gap-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-8 text-sm text-slate-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
