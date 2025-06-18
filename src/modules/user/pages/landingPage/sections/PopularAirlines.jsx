// Import airline logos
import indigo from "../../../../../assets/images/indigo.png";
import airIndia from "../../../../../assets/images/air_india.png";
import airIndiaExpress from "../../../../../assets/images/air_india_express.png";
import akasaAir from "../../../../../assets/images/akasa_air.png";
import spicejet from "../../../../../assets/images/spicejet.png";
import allianceAir from "../../../../../assets/images/alliance_air.png";

// Airline data
const airlines = [
  {
    name: "IndiGo",
    image: indigo,
    gradient: "from-blue-200 to-blue-100",
  },
  {
    name: "Air India",
    image: airIndia,
    gradient: "from-red-200 to-red-100",
  },
  {
    name: "Air India Express",
    image: airIndiaExpress,
    gradient: "from-orange-200 to-orange-100",
  },
  {
    name: "Akasa Air",
    image: akasaAir,
    gradient: "from-purple-200 to-purple-100",
  },
  {
    name: "SpiceJet",
    image: spicejet,
    gradient: "from-yellow-200 to-yellow-100",
  },
  {
    name: "Alliance Air",
    image: allianceAir,
    gradient: "from-gray-300 to-gray-200",
  },
];

// React component
export const PopularAirlines = () => (
  <section className="py-8 bg-yellow-100/50">
    <div className="max-w-8xl mx-auto px-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-left">
        Popular Domestic Airlines
      </h3>

      <div className="flex flex-wrap justify-between gap-4">
        {airlines.map(({ name, image, gradient }) => (
          <div
            key={name}
            className={`flex-1 min-w-[8rem] max-w-[11rem] sm:min-w-[10rem] sm:max-w-[12rem] h-20 rounded-lg shadow flex items-center justify-center p-2 bg-gradient-to-br ${gradient}`}
          >
            <img src={image} alt={name} className="h-8 object-contain" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
