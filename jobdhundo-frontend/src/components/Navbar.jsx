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
    { label: "Jobs", path: "/jobs" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Resume", path: "/resume" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Brand */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-600 flex items-center justify-center shadow-md">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
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
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition
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

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {token && (
              <button className="hidden md:flex p-2 rounded-xl text-text-muted hover:bg-bg">
                <Bell size={18} />
              </button>
            )}

            {token && (
              <div className="hidden md:block relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={`https://ui-avatars.com/api/?name=${
                      user.username || "User"
                    }&background=059669&color=fff`}
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
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-bg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium
                  ${
                    location.pathname === item.path
                      ? "bg-primary-100 text-primary-700"
                      : "text-text-main hover:bg-bg"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {token && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
