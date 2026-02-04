// src/api.js

const API_BASE = "http://127.0.0.1:8000/api"; // no trailing slash

// --- REFRESH TOKEN ---
async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return false;

  const res = await fetch(`${API_BASE}/token/refresh/`, {   // ✅ SimpleJWT default
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
export async function getJobs(query) {
  return authFetch(`${API_BASE}/jobs/?q=${encodeURIComponent(query)}`);
}

// --- PROFILE (protected) ---
export async function getProfile(id) {
  return authFetch(`${API_BASE}/profile/${id}/`);
}

export async function updateProfile(id, data) {
  return authFetch(`${API_BASE}/profile/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}


