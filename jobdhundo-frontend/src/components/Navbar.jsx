import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Bell,
  Settings,
  ChevronDown,
  Briefcase,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setMobileOpen(false);
    navigate("/login");
  };

  const navItems = [
    { label: "JOBS", path: "/jobs" },
    { label: "RESUME", path: "/resume" },
    { label: "PROFILE", path: "/profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Brand */}
          <Link to="/jobs" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center border border-primary-500/30 shadow-glow group-hover:scale-105 transition-transform duration-300">
              <Briefcase size={20} className="text-primary-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-300 transition-colors">
              Job<span className="text-primary-500">Dhundo</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                      ${active
                        ? "bg-primary-500/10 text-primary-300 border border-primary-500/20 shadow-glow"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {token && (
                <button className="hidden md:flex p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                  <Bell size={20} />
                </button>
              )}

              {token && (
                <div className="hidden md:block relative group">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.username || "User"
                        }&background=a855f7&color=fff&rounded=true`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-white/10 group-hover:border-primary-500 transition-colors"
                    />
                    <ChevronDown size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>

                  <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-56 glass-card p-2 flex flex-col gap-1">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/10 hover:text-white transition-colors">
                        <Settings size={16} /> Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-white/5 animate-fade-in-down">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors
                  ${location.pathname === item.path
                    ? "bg-primary-500/20 text-primary-300"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {token && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 font-medium transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
