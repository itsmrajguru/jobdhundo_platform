// src/api.js

const API_BASE_RAW = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const API_BASE = API_BASE_RAW.replace(/\/$/, ""); // ensure no trailing slash

// --- REFRESH TOKEN ---
async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return false;

  const res = await fetch(`${API_BASE}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    return false;
  }

  const data = await res.json();
  localStorage.setItem("token", data.access);
  return true;
}

// --- AUTH FETCH (protected endpoints only) ---
async function authFetch(url, options = {}) {
  let token = localStorage.getItem("token");

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  let res = await fetch(url, options);

  // If token expired (401 Unauthorized), try refresh
  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      token = localStorage.getItem("token");
      options.headers.Authorization = `Bearer ${token}`;
      res = await fetch(url, options); // retry original request
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`${res.status} - ${errorText}`);
  }

  if (res.status === 204) {
    return {};
  }

  return res.json();
}

// --- AUTH ---
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Login failed: ${res.status} - ${errorText}`);
  }
  return res.json();
}

export async function signupUser({ username, password }) {
  const res = await fetch(`${API_BASE}/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Signup failed: ${res.status} - ${JSON.stringify(data)}`);
  }

  return data;
}

// --- JOBS (protected) ---
export async function getJobs(query, page = 1, limit = 10) {
  return authFetch(`${API_BASE}/jobs/?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
}

// --- PROFILE (protected CRUD) ---

// Get all profiles (usually returns array)
export async function getProfileList() {
  return authFetch(`${API_BASE}/profile/`);
}

// Get single profile by ID
export async function getProfile(id) {
  return authFetch(`${API_BASE}/profile/${id}/`);
}

// Create new profile
export async function createProfile(data) {
  return authFetch(`${API_BASE}/profile/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Update existing profile
export async function updateProfile(id, data) {
  return authFetch(`${API_BASE}/profile/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Delete profile
export async function deleteProfile(id) {
  return authFetch(`${API_BASE}/profile/${id}/`, {
    method: "DELETE",
  });
}

// --- RESUME PARSING ---
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file);

  // Note: Do NOT set Content-Type header manually for FormData, 
  // let the browser set it with the boundary.
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/resume/upload/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed: ${res.status} - ${errorText}`);
  }

  return res.json();
}

