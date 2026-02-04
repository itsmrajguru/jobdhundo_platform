import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import ResumeCard from "../components/ResumeCard";
import { getProfileList, createProfile, updateProfile, deleteProfile } from "../api";
import { User, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfileList();
        if (data && data.length > 0) {
          setProfile(data[0]);
          setEditing(false);
        } else {
          setEditing(true);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setEditing(true);
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      let updatedProfile;
      if (profile?.id) {
        updatedProfile = await updateProfile(profile.id, formData);
      } else {
        updatedProfile = await createProfile(formData);
      }
      setProfile(updatedProfile);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert(`Error saving profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-main pb-20 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] opacity-20 pointer-events-none" />

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight flex items-center justify-center gap-3">
            <User size={36} className="text-primary-400" /> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Profile</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Manage your career identity. Keep your details updated to match with the best opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in-up">

          {/* Left: Form */}
          <div className="flex justify-center transition-all duration-300">
            <div className="glass-card p-1 rounded-3xl w-full max-w-2xl">
              <div className="bg-bg/50 rounded-[22px] p-8 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-yellow-400" />
                  {editing ? "Edit Profile" : "Profile Details"}
                </h2>
                <ProfileForm
                  initialData={profile}
                  onSubmit={handleSubmit}
                  loading={loading}
                  editing={editing}
                  onToggleEdit={setEditing}
                />
              </div>
            </div>
          </div>

          {/* Right: Preview Card */}
          <div className="flex justify-center lg:sticky lg:top-24 items-start">
            {profile ? (
              <ResumeCard
                profile={profile}
                onEdit={() => setEditing(true)}
                onDelete={async () => {
                  if (window.confirm("Delete profile?")) {
                    await deleteProfile(profile.id);
                    setProfile(null);
                    setEditing(true);
                  }
                }}
              />
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center text-slate-500 bg-white/5 backdrop-blur-sm w-full max-w-lg aspect-[3/4] flex items-center justify-center">
                <div className="space-y-4">
                  <User size={48} className="mx-auto text-slate-600 opacity-50" />
                  <p>Complete your profile to see the preview card here.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}