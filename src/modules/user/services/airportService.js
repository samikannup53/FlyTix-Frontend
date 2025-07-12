export const fetchAirports = async (search) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/airports?search=${encodeURIComponent(search)}`
    );
    if (!response.ok) throw new Error("Failed to fetch airport data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Airport fetch failed", error);
    return [];
  }
};
