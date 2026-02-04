import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import ResumeCard from "../components/ResumeCard";
import { getProfileList, createProfile, updateProfile, deleteProfile } from "../api";

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
      alert("Error saving profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Form */}
          <div className="flex justify-center">
            <ProfileForm 
              initialData={profile} 
              onSubmit={handleSubmit} 
              loading={loading} 
            />
          </div>

          {/* Right: Preview Card */}
          <div className="flex justify-center lg:sticky lg:top-24">
            {profile ? (
              <ResumeCard 
                profile={profile} 
                onEdit={() => setEditing(true)} 
                onDelete={async () => {
                   if(window.confirm("Delete profile?")) {
                     await deleteProfile(profile.id);
                     setProfile(null);
                     setEditing(true);
                   }
                }} 
              />
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-20 text-center text-gray-400">
                Your resume preview will appear here.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}