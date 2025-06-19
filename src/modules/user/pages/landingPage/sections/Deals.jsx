import { useState } from "react";

const flightDeals = [
  {
    from: "Salem",
    to: "Chennai",
    date: "Today",
    stops: "Non-stop",
    fare: "₹1,899",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5aa99d75e4b047f5cf4ef14a.jpg?cityName=Salem",
  },
  {
    from: "Trichy",
    to: "Hyderabad",
    date: "Tomorrow",
    stops: "1 Stop",
    fare: "₹2,499",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5f2b3a17e4b0f5e5d32f4410.jpg?cityName=Hyderabad",
  },
  {
    from: "Coimbatore",
    to: "Delhi",
    date: "Today",
    stops: "Express",
    fare: "₹3,199",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/4e2c3b92e4b05d246ecb3629.jpg?cityName=Delhi",
  },
  {
    from: "Chennai",
    to: "Mumbai",
    date: "Tomorrow",
    stops: "Non-stop",
    fare: "₹2,999",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/598c7b56e4b0b7a4f00d1e49.jpg?cityName=Mumbai",
  },
  {
    from: "Bangalore",
    to: "Pune",
    date: "Today",
    stops: "1 Stop",
    fare: "₹2,799",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5e7367cfe4b06d000103f10a.jpg?cityName=Pune",
  },
  {
    from: "Madurai",
    to: "Bangalore",
    date: "Tomorrow",
    stops: "Express",
    fare: "₹2,299",
    image:
      "https://images-cf.ixigo.workers.dev/v2/images_by_id/5d9dbf37bb2a4c9c2c4f728b.jpg?cityName=Madurai",
  },
];

export const Deals = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleDeals = showAll ? flightDeals : flightDeals.slice(0, 5);

  return (
    <section className="py-16 text-left">
      <div className="max-w-[1600px] mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured{" "}
          <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
            Flight Deals
          </span>
        </h2>

        <div className="flex flex-wrap gap-6 justify-center xl:justify-between">
          {visibleDeals.map((deal, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl w-full sm:w-[30%] xl:w-[18%] shadow-sm hover:shadow-[0_4px_20px_rgba(236,72,153,0.25)] transition overflow-hidden flex flex-col"
            >
              <img
                src={deal.image}
                alt={`${deal.from} to ${deal.to}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center text-pink-800 font-semibold text-base mb-2">
                  {deal.from}
                  <i className="fa-solid fa-plane mx-2 text-sm"></i>
                  {deal.to}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    {deal.date}
                  </span>
                  <span className="text-gray-600 text-xs">{deal.stops}</span>
                </div>

                <div className="flex-grow" />

                <div className="flex justify-between items-center mt-auto">
                  <p className="text-lg font-bold text-pink-800">{deal.fare}</p>
                  <a
                    href="#"
                    className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 text-white text-xs px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-all"
                  >
                    Book Now <i className="fa-solid fa-arrow-right ml-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 text-white px-6 py-2.5 rounded-full shadow-md hover:opacity-90 transition-all text-sm sm:text-base font-semibold"
          >
            {showAll ? "View Less" : "View More"}
            <i
              className={`fa-solid ${showAll ? "fa-chevron-up" : "fa-chevron-down"}`}
            ></i>
          </button>
        </div>
      </div>
    </section>
  );
};
