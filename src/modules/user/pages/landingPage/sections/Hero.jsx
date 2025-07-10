import { Link } from "react-router-dom";
import mapImage from "../../../../../assets/images/map.png";
import swapIcon from "../../../../../assets/images/swap.png";
import { HeroFlightSearchBar } from "./HeroFlightSearchBar";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-tr from-amber-200 to-rose-200 relative lg:pb-24 ">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-10 py-14 sm:py-16  flex flex-col-reverse md:flex-row items-center md:items-start lg:items-center gap-8 sm:gap-10 md:gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-[1.75rem] lg:text-4xl xl:text-[3rem] font-bold text-gray-900 mb-1 lg:mb-2 xl:mb-6 leading-snug sm:leading-snug md:leading-tight">
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
          <blockquote className="italic text-pink-700 mb-10 text-base hidden lg:block">
            “Adventure awaits. Let your journey take flight.”
          </blockquote>
          <Link
            to={"/flights"}
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

      {/* Search Bar */}
      <HeroFlightSearchBar />
    </section>
  );
};
