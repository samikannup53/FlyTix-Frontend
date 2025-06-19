// Import airline logos
import indigo from "../../../../../assets/images/indigo.png";
import airIndia from "../../../../../assets/images/air_india.png";
import airIndiaExpress from "../../../../../assets/images/air_india_express.png";
import akasaAir from "../../../../../assets/images/akasa_air.png";
import spicejet from "../../../../../assets/images/spicejet.png";
import allianceAir from "../../../../../assets/images/alliance_air.png";
import vistara from "../../../../../assets/images/vistara.png"; // ✅ New Import

// Airline data with hover shadow color
const airlines = [
  {
    name: "IndiGo",
    image: indigo,
    gradient: "from-blue-200 to-blue-100",
    hoverShadow: "hover:shadow-blue-300",
  },
  {
    name: "Air India",
    image: airIndia,
    gradient: "from-red-200 to-red-100",
    hoverShadow: "hover:shadow-red-300",
  },
  {
    name: "Air India Express",
    image: airIndiaExpress,
    gradient: "from-orange-200 to-orange-100",
    hoverShadow: "hover:shadow-orange-300",
  },
  {
    name: "Akasa Air",
    image: akasaAir,
    gradient: "from-purple-200 to-purple-100",
    hoverShadow: "hover:shadow-purple-300",
  },
  {
    name: "SpiceJet",
    image: spicejet,
    gradient: "from-yellow-200 to-yellow-100",
    hoverShadow: "hover:shadow-yellow-300",
  },
  {
    name: "Alliance Air",
    image: allianceAir,
    gradient: "from-gray-300 to-gray-200",
    hoverShadow: "hover:shadow-gray-400",
  },
  {
    name: "Vistara",
    image: vistara,
    gradient: "from-rose-200 to-rose-100",
    hoverShadow: "hover:shadow-rose-300",
  },
];

// React component
export const PopularAirlines = () => (
  <section className="py-8">
    <div className="max-w-[1600px] mx-auto px-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Popular{" "}
        <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
          Domestic Airlines
        </span>
      </h2>

      <div className="flex flex-wrap justify-center xl:justify-between gap-4">
        {airlines.map(({ name, image, gradient, hoverShadow }) => (
          <div
            key={name}
            className={`flex-1 min-w-[8rem] max-w-[11rem] sm:min-w-[10rem] sm:max-w-[12rem] h-20 rounded-xl shadow-md transition-all duration-300 hover:scale-105 ${hoverShadow} flex items-center justify-center p-2 bg-gradient-to-br ${gradient}`}
          >
            <img src={image} alt={name} className="h-8 object-contain" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
