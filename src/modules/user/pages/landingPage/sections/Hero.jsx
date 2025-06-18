import mapImage from "../../../../../assets/images/map.png";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-tr from-amber-200 to-rose-200 relative pb-24 sm:pb-28 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20 flex flex-col-reverse md:flex-row items-center md:items-start lg:items-center gap-8 sm:gap-10 md:gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-[1.85rem] lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-1 lg:mb-2 xl:mb-4 leading-snug sm:leading-snug md:leading-tight">
            Book{" "}
            <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
              Flights
            </span>{" "}
            with Ease
          </h2>
          <p className=" text-base md:text-[0.85rem] xl:text-xl text-gray-800 mb-1 lg:mb-4 xl:mb-6">
            Fast, reliable, and affordable air travel with
            <span className="text-pink-800 font-semibold"> FlyTix</span>. Search,
            compare, and book flights — all in one place.
          </p>
          <blockquote className="italic text-pink-700 mb-6 sm:mb-8 text-sm sm:text-base">
            “Adventure awaits. Let your journey take flight.”
          </blockquote>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md hover:opacity-90 transition-all text-sm sm:text-base font-semibold"
          >
            Book Now <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={mapImage}
            alt="Airplane Map"
            className="w-full mx-auto drop-shadow-xl"
          />
        </div>
      </div>

      {/* Floating Flight Search Form */}
      <div className="hidden sm:flex absolute inset-x-0 -bottom-20 justify-center z-20 px-4 md:px-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 w-full max-w-7xl shadow-xl">
          {/* Trip Type Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-5 sm:mb-6 justify-start">
            <button className="trip-toggle px-4 sm:px-6 py-2 rounded-lg font-semibold border border-pink-800 bg-white text-pink-800 hover:bg-pink-800 hover:text-white transition">
              One Way
            </button>
            <button className="trip-toggle px-4 sm:px-6 py-2 rounded-lg font-semibold border border-pink-800 bg-white text-pink-800 hover:bg-pink-800 hover:text-white transition">
              Round Trip
            </button>
          </div>

          {/* Search Form */}
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {/* From */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-pink-900">From</label>
              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                <i className="fas fa-plane-departure text-pink-700 mr-2"></i>
                <input
                  type="text"
                  placeholder="Departure City"
                  className="w-full bg-transparent outline-none text-pink-900 placeholder:text-pink-400 text-sm"
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-pink-900">To</label>
              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                <i className="fas fa-plane-arrival text-pink-700 mr-2"></i>
                <input
                  type="text"
                  placeholder="Destination City"
                  className="w-full bg-transparent outline-none text-pink-900 placeholder:text-pink-400 text-sm"
                />
              </div>
            </div>

            {/* Departure */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-pink-900">Departure</label>
              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                <i className="fas fa-calendar-day text-pink-700 mr-2"></i>
                <input
                  type="date"
                  className="w-full bg-transparent outline-none text-pink-900 text-sm"
                />
              </div>
            </div>

            {/* Return */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-pink-900">Return</label>
              <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                <i className="fas fa-calendar-week text-pink-700 mr-2"></i>
                <input
                  type="date"
                  className="w-full bg-transparent outline-none text-pink-900 text-sm"
                />
              </div>
            </div>

            {/* Passengers & Class */}
            <div className="relative">
              <label className="block mb-1 text-sm font-semibold text-pink-900">
                Passengers & Class
              </label>
              <button
                type="button"
                className="flex items-center gap-2 bg-white p-2 rounded-lg w-full text-pink-900 hover:bg-gray-100 shadow-sm text-sm"
              >
                <i className="fas fa-user-group text-pink-700"></i>
                <span>1 Adult · Economy</span>
              </button>
            </div>

            {/* Search Button */}
            <div>
              <button className="bg-yellow-400 text-pink-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition w-full flex items-center justify-center gap-2 text-sm sm:text-base">
                <i className="fas fa-magnifying-glass"></i> Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
