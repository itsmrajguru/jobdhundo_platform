// src/api.js
const API_BASE = "http://localhost:8000/api"; // adjust if deployed

// --- AUTH ---
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function signupUser(username, password) {
  const res = await fetch(`${API_BASE}/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

// --- JOBS ---
export async function getJobs(query, token) {
  const res = await fetch(`${API_BASE}/jobs/?q=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// --- PROFILE ---
export async function getProfile(id, token) {
  const res = await fetch(`${API_BASE}/profile/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateProfile(id, data, token) {
  const res = await fetch(`${API_BASE}/profile/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
