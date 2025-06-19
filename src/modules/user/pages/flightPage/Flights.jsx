import { LandingFooter, UserHeader } from "../../components";
import { FiltersSideBar } from "./sections/FilterSideBar";
import { FlightResults } from "./sections/FlightResults";
import { FlightSearchBar } from "./sections/FlightSearchBar";

export const Flights = () => {
  return (
    <>
      <UserHeader />
      <FlightSearchBar />
      <section className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-200 min-h-screen py-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
          <FiltersSideBar />
          <FlightResults />
        </div>
      </section>
      <LandingFooter />
    </>
  );
};
