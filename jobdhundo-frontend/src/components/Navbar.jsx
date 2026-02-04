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
    navigate("/login");
  };

  const navItems = [
    { label: "Jobs", path: "/jobs" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Resume", path: "/resume" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-18 items-center justify-between py-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center shadow-md">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-text-main tracking-tight">
              Job<span className="text-primary-600">Dhundo</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${
                      active
                        ? "bg-primary-100 text-primary-700"
                        : "text-text-muted hover:bg-bg hover:text-text-main"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {token && (
              <button className="p-2 rounded-xl text-text-muted hover:bg-bg">
                <Bell size={18} />
              </button>
            )}

            {token ? (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.username || "User"}&background=059669&color=fff`}
                    alt="Profile"
                    className="w-10 h-10 rounded-2xl border border-border"
                  />
                  <ChevronDown size={14} className="text-text-muted" />
                </div>

                <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="w-52 bg-surface border border-border rounded-2xl shadow-card p-2">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm rounded-xl hover:bg-bg">
                      <Settings size={16} /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 rounded-xl hover:bg-red-50"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
