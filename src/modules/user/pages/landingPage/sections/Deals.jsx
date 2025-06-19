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
];

export const Deals = () => {
  return (
    <section className="py-16 bg-yellow-100/50 text-left">
      <div className="max-w-[1600px] mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured{" "}
          <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
            Flight Deals
          </span>
        </h2>

        <div className="flex flex-wrap gap-6 justify-start">
          {flightDeals.map((deal, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl w-full sm:w-[48%] xl:w-[30%] shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <img
                src={deal.image}
                alt={`${deal.from} to ${deal.to}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                {/* Route */}
                <div className="flex items-center text-pink-800 font-semibold text-base mb-2">
                  {deal.from}
                  <i className="fa-solid fa-plane mx-2 text-sm"></i>
                  {deal.to}
                </div>

                {/* Date + Stops */}
                <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    {deal.date}
                  </span>
                  <span className="text-gray-600 text-xs">{deal.stops}</span>
                </div>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Fare & CTA */}
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
      </div>
    </section>
  );
};
