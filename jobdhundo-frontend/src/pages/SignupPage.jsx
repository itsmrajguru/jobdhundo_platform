import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const data = await signupUser({ username, password });
      if (data && data.id) {
        navigate("/login");
      } else if (data && data.username) {
        setError(data.username[0] || "Signup failed");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full" style={{ maxWidth: 360 }}>
        <div className="rounded-3xl border-2 p-4 shadow-lg" style={{ borderColor: "#19a974", borderRadius: 28 }}>
          <div className="text-center mb-3">
            <span className="text-2xl sm:text-3xl font-semibold">Job<span style={{ color: "#19a974" }}>Dhundo</span></span>
          </div>

          <h4 className="text-center font-bold text-lg mb-1">Create Account</h4>
          <h5 className="text-center text-sm text-gray-600 mb-4">Sign up to get started</h5>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                className="w-full border rounded px-3 py-2 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border rounded px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                className="w-full border rounded px-3 py-2 text-sm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-full text-white font-semibold"
              style={{ backgroundColor: "#19a974" }}
            >
              {loading ? "Signing up..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-3">
            <a href="/login" className="text-sm" style={{ color: "#19a974" }}>Already have an account? Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
