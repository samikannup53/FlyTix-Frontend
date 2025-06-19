import { useState } from "react";

const routes = [
  {
    city: "Chennai",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5d9dbf39bb2a4c9c2c4f7284.jpg?cityName=Chennai",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
  {
    city: "Delhi",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/4e2c3b92e4b05d246ecb3629.jpg?cityName=Delhi",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
  {
    city: "Mumbai",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/598c7b56e4b0b7a4f00d1e49.jpg?cityName=Mumbai",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
  {
    city: "Hyderabad",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5f2b3a17e4b0f5e5d32f4410.jpg?cityName=Hyderabad",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
  {
    city: "Trichy",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5aa99d75e4b047f5cf4ef14a.jpg?cityName=Trichy",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
  {
    city: "Chennai",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5d9dbf39bb2a4c9c2c4f7284.jpg?cityName=Chennai",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
  {
    city: "Bangalore",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5b1e0dbae4b08e5b9f0ed24a.jpg?cityName=Bangalore",
    destinations: "To: Chennai • Coimbatore • Kerala",
  },
  {
    city: "Hyderabad",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5f2b3a17e4b0f5e5d32f4410.jpg?cityName=Hyderabad",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
  {
    city: "Trichy",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5aa99d75e4b047f5cf4ef14a.jpg?cityName=Trichy",
    destinations: "To: Coimbatore • Bangalore • Kerala",
  },
];

export const PopularRoutes = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleRoutes = showAll ? routes : routes.slice(0, 6);

  return (
    <section className="py-8 text-left">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Popular{" "}
          <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
            Flight Routes
          </span>
        </h2>

        {/* Route Cards */}
        <div className="flex flex-wrap gap-6">
          {visibleRoutes.map((route, index) => (
            <div
              key={index}
              className="flex w-full sm:w-[48%] xl:w-[32%] border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md transition"
            >
              <img
                src={route.image}
                alt={route.city}
                className="w-1/3 object-cover h-full"
              />
              <div className="p-4 w-2/3">
                <h3 className="font-semibold text-pink-800">
                  {route.city} Flights
                </h3>
                <p className="text-sm text-gray-800">{route.destinations}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 text-white px-6 py-2.5 rounded-full shadow-md hover:opacity-90 transition-all text-sm sm:text-base font-semibold"
          >
            {showAll ? "View Less" : "View More"}{" "}
            <i className={`fa-solid fa-arrow-${showAll ? "up" : "right"}`}></i>
          </button>
        </div>
      </div>
    </section>
  );
};
