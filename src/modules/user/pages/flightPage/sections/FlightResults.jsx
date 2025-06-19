import {FlightDateSlider} from "./FlightDateSlider";
import {SortBySection} from "./SortBySection";
import {FlightResultCard} from "./FlightResultCard";

export const FlightResults = () => {
  return (
    <section className="lg:w-3/4 w-full no-scrollbar pr-2">
      <div className="space-y-6">
        <FlightDateSlider/>
        <SortBySection />
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-800">Chennai → Trivandrum</div>
          <div className="text-sm text-gray-600">5 Flights Found</div>
        </div>
        {[...Array(5)].map((_, index) => (
          <FlightResultCard key={index} />
        ))}
      </div>
    </section>
  );
};

