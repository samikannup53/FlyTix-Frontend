const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => {
      return {};
    });
    throw new Error(errData.error || "API Error");
  }
  return res.json();
}
