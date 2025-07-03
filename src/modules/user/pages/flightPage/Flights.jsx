import { useState } from "react";
import { LandingFooter, UserHeader } from "../../components";
import { FiltersSideBar } from "./sections/FilterSideBar";
import { FlightResults } from "./sections/FlightResults";
import { FlightSearchBar } from "./sections/FlightSearchBar";

export const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleSearch = async (searchParams) => {
  //   try {
  //     setLoading(true);
  //     setFlights([]); // clear old data

  //     const res = await fetch("http://localhost:8000/api/flights/search", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(searchParams),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.msg || "Failed to fetch flights");
  //     }

  //     setFlights(data.data);
  //   } catch (err) {
  //     console.error("Flight fetch error:", err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = async (searchInput) => {
    // If using mock: searchInput will have { results: [...] }
    if (searchInput?.results) {
      setFlights(searchInput.results); // use mock results
      return;
    }

    // Otherwise, fallback to real API
    try {
      setLoading(true);
      setFlights([]); // clear old results

      const res = await fetch("http://localhost:8000/api/flights/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchInput), // input is params
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch flights");
      }

      setFlights(data.data);
    } catch (err) {
      console.error("Flight fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserHeader />
      <FlightSearchBar onSearch={handleSearch} />
      <section className="bg-gradient-to-tr from-orange-50 via-pink-50 to-orange-50 min-h-screen py-10">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
          <FiltersSideBar />
          <FlightResults flights={flights} loading={loading} />
        </div>
      </section>
      <LandingFooter />
    </>
  );
};
