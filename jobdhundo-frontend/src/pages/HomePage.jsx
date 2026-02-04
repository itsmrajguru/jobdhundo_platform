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
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full" style={{ maxWidth: 980 }}>
        <div className="rounded-3xl border p-8 shadow-lg" style={{ borderColor: "#ECFDF5" }}>
          <div className="text-center py-5">
            <span className="text-2xl sm:text-3xl font-semibold text-neutral-900">Job<span className="text-primary-600">Dhundo</span></span>
            <h2 className="mt-4 text-lg sm:text-xl text-neutral-800">Heyy, {username}!</h2>
            <h1 className="display-4 font-bold text-2xl sm:text-4xl text-neutral-900">Welcome to Job-Dhundo</h1>
            <p className="lead text-neutral-600 mt-2">The future of your career starts with a single search.</p>

            <div className="mt-4">
              <Link to="/dashboard" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-sm sm:text-base transition-colors">
                Explore Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
