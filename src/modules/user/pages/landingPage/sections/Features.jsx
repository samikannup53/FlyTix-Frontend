import registerImg from "../../../../../assets/images/register.png";
import bookingImg from "../../../../../assets/images/booking.png";
import boardingImg from "../../../../../assets/images/boarding.png";
import flyImg from "../../../../../assets/images/airline-ticket.png";

const features = [
  {
    title: "Sign Up",
    description: "Create your account for a seamless booking experience.",
    icon: registerImg,
    bg: "from-[#e0f2fe] to-[#bae6fd]", // light blue
    textColor: "text-blue-800",
    descColor: "text-blue-900",
  },
  {
    title: "Book",
    description: "Quickly search and book flights effortlessly.",
    icon: bookingImg,
    bg: "from-[#fef9c3] to-[#fde68a]", // warm yellow
    textColor: "text-yellow-700",
    descColor: "text-yellow-900",
  },
  {
    title: "Board",
    description: "Enjoy fast check-ins and a smooth boarding experience.",
    icon: boardingImg,
    bg: "from-[#e0e7ff] to-[#c7d2fe]", // soft indigo
    textColor: "text-indigo-700",
    descColor: "text-indigo-900",
  },
  {
    title: "Fly",
    description: "Travel safely with trusted airlines worldwide.",
    icon: flyImg,
    bg: "from-[#fce7f3] to-[#fbcfe8]", // soft pink
    textColor: "text-pink-700",
    descColor: "text-pink-900",
  },
];

export const Features = () => {
  return (
    <section className="pt-36 pb-10 ">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Book | Board | Fly with &nbsp;
          <span className="bg-gradient-to-r from-orange-700 via-pink-700 to-pink-800 bg-clip-text text-transparent">
            Ease
          </span>
        </h2>
        {/* Features Flex Container */}
        <div className="flex flex-wrap justify-center xl:justify-between gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex items-center p-5 rounded-2xl bg-gradient-to-br ${feature.bg} shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 backdrop-blur-sm bg-opacity-60 w-full md:w-[45%]  lg:w-[20%] xl:w-[23%] min-w-[250px] h-40`}
              style={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-14 h-14 object-contain mr-4 drop-shadow-md"
              />
              <div className="text-left">
                <h4
                  className={`text-2xl font-semibold mb-1 ${feature.textColor}`}
                >
                  {feature.title}
                </h4>
                <p className={`text-sm leading-snug ${feature.descColor}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
