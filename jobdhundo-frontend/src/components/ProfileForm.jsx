import { useState, useEffect } from "react";

export default function ProfileForm({ initialData, onSubmit, loading }) {
  // Always initialize with empty strings to avoid "undefined" input errors
  const [formData, setFormData] = useState({
    full_name: "",
    summary: "",
    work: "",
    education: "",
    skills: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.full_name || "",
        summary: initialData.summary || "",
        work: initialData.work || "",
        education: initialData.education || "",
        skills: initialData.skills || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 w-full max-w-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Profile</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
        <input name="full_name" type="text" value={formData.full_name} onChange={handleChange} className="border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#10b981] outline-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Summary</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange} className="border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#10b981] outline-none" rows="3" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Work Experience</label>
        <input name="work" type="text" value={formData.work} onChange={handleChange} className="border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#10b981] outline-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Education</label>
        <input name="education" type="text" value={formData.education} onChange={handleChange} className="border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#10b981] outline-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Skills (Comma Separated)</label>
        <input name="skills" type="text" value={formData.skills} onChange={handleChange} className="border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#10b981] outline-none" />
      </div>

      <button type="submit" disabled={loading} className="mt-4 px-4 py-3 bg-[#10b981] text-white font-bold rounded-lg hover:bg-[#059669] disabled:opacity-50 transition-colors">
        {loading ? "Saving..." : "Update Profile"}
      </button>
    </form>
  );
}