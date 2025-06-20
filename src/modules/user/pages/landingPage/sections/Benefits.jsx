// Import benefit icons
import pricingIcon from "../../../../../assets/images/pricing.png";
import supportIcon from "../../../../../assets/images/customer-service.png";
import secureIcon from "../../../../../assets/images/transaction.png";
import refundIcon from "../../../../../assets/images/convenience.png";
import airlineIcon from "../../../../../assets/images/airline-ticket.png";

// Benefits Data
const benefits = [
  {
    title: "Best Fare",
    description: "Lowest price guaranteed.",
    icon: pricingIcon,
    gradient: "from-purple-600 to-red-500",
  },
  {
    title: "24/7 Help",
    description: "We're always here for you.",
    icon: supportIcon,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Secure Pay",
    description: "Encrypted transactions.",
    icon: secureIcon,
    gradient: "from-green-400 to-teal-500",
  },
  {
    title: "Easy Refunds",
    description: "Hassle-free cancellations & quick refunds.",
    icon: refundIcon,
    gradient: "from-blue-600 via-sky-500 to-teal-400",
  },
  {
    title: "Top Airlines",
    description: "Fly with the best brands.",
    icon: airlineIcon,
    gradient: "from-pink-500 to-red-500",
  },
];

// React Component
export const Benefits = () => {
  return (
    <section className="py-8" id="benefits">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Why Choose &nbsp;
          <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
            FlyTix
          </span>{" "}
          &nbsp; ?
        </h2>

        {/* Responsive Flex Grid */}
        <div className="flex flex-wrap gap-6 justify-center xl:justify-between">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`flex items-center p-4 rounded-xl text-white w-full sm:w-[47%] lg:w-[30%] xl:w-[18%] h-20 md:h-24 transition-transform transform-gpu duration-300 hover:scale-[1.04] bg-gradient-to-br ${benefit.gradient} shadow-md`}
            >
              <img
                src={benefit.icon}
                alt={benefit.title}
                className="w-12 h-12 mr-4 object-contain"
              />
              <div>
                <h4 className="text-base font-semibold mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
