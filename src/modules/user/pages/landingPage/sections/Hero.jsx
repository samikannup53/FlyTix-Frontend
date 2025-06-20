import { Link } from "react-router-dom";
import mapImage from "../../../../../assets/images/map.png";
import swapIcon from "../../../../../assets/images/swap.png";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-tr from-amber-200 to-rose-200 relative pb-24 ">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-10 py-14 sm:py-16  flex flex-col-reverse md:flex-row items-center md:items-start lg:items-center gap-8 sm:gap-10 md:gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-[1.85rem] lg:text-4xl xl:text-[3.5rem] font-bold text-gray-900 mb-1 lg:mb-2 xl:mb-6 leading-snug sm:leading-snug md:leading-tight">
            Book{" "}
            <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
              Flights
            </span>{" "}
            with Ease
          </h2>
          <p className=" text-base md:text-[0.85rem] xl:text-xl text-gray-800 mb-1 lg:mb-4 xl:mb-6">
            Fast, reliable, and affordable air travel with
            <span className="text-pink-800 font-semibold"> FlyTix</span>.
            Search, compare, and book flights — all in one place.
          </p>
          <blockquote className="italic text-pink-700 mb-6 sm:mb-8 xl:mb-10 text-sm sm:text-base">
            “Adventure awaits. Let your journey take flight.”
          </blockquote>
          <Link
            to={'/flights'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md hover:opacity-90 transition-all text-sm sm:text-base font-semibold"
          >
            Book Now <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={mapImage}
            alt="Airplane Map"
            className="w-full max-w-[620px] mx-auto drop-shadow-xl"
          />
        </div>
      </div>

      {/* Floating Flight Search Form */}
      <div className="max-w-[1500px] mx-auto hidden sm:flex absolute inset-x-0 -bottom-16 justify-center z-20 px-4 md:px-8">
        <div className="bg-gradient-to-r from-orange-800 via-pink-800 to-pink-900 text-white border border-white/20 rounded-2xl p-5 sm:p-6 w-full max-w-7xl shadow-xl backdrop-blur-md">
          {/* Trip Type Toggle */}
          <div className="flex flex-wrap gap-3 mb-5 sm:mb-6">
            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white/30 rounded-full bg-transparent hover:bg-white/20 transition-all">
              <i className="fa-solid fa-arrow-right"></i> One Way
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white/30 rounded-full bg-transparent hover:bg-white/20 transition-all">
              <i className="fa-solid fa-retweet"></i> Round Trip
            </button>
          </div>

          {/* Search Form */}
          <form className="flex flex-wrap gap-1">
            {/* From */}
            <div className="relative flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent rounded-l-xl focus-within:border-yellow-300 transition-all">
              <label className="block text-xs font-medium text-white mb-1">
                From
              </label>
              <input
                type="text"
                placeholder="Departure City"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
              <div className="absolute top-4 -right-4 z-10 hidden sm:block">
                <button
                  className="bg-gradient-to-br from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white p-1 rounded-full shadow-lg"
                  title="Swap"
                >
                  <img src={swapIcon} className="w-5" alt="Swap" />
                </button>
              </div>
            </div>

            {/* To */}
            <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
              <label className="ml-2 block text-xs font-medium text-white mb-1">
                To
              </label>
              <input
                type="text"
                placeholder="Destination City"
                className="w-full ml-2 bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
            </div>

            {/* Departure */}
            <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
              <label className="block text-xs font-medium text-white mb-1">
                Departure
              </label>
              <input
                type="text"
                placeholder="Select Date"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
            </div>

            {/* Return */}
            <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
              <label className="block text-xs font-medium text-white mb-1">
                Return
              </label>
              <input
                type="text"
                placeholder="Select Date"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
            </div>

            {/* Passengers */}
            <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
              <label className="block text-xs font-medium text-white mb-1">
                Passengers & Class
              </label>
              <input
                type="text"
                placeholder="1 Adult · Economy"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-center">
              <button className="h-full w-full px-5 py-2 lg:text-xl font-semibold text-white bg-gradient-to-br from-rose-600 via-rose-600 to-orange-700 hover:opacity-90 rounded-r-xl shadow transition-all flex items-center justify-center gap-2">
                <i className="fa-solid fa-magnifying-glass"></i> <span className="hidden lg:block">Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
