import { useRef } from "react";

export const FlightDateSlider = () => {
  const dateSliderRef = useRef(null);

  const handleScroll = (direction) => {
    if (dateSliderRef.current) {
      const scrollAmount = 200;
      dateSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const dates = [
    { day: "Fri, 27 Jun", price: "₹3,499" },
    { day: "Sat, 28 Jun", price: "₹3,199" },
    { day: "Sun, 29 Jun", price: "₹2,999" },
    { day: "Mon, 30 Jun", price: "₹3,699" },
    { day: "Tue, 01 Jul", price: "₹3,399" },
    { day: "Wed, 02 Jul", price: "₹3,399" },
    { day: "Thu, 03 Jul", price: "₹3,399" },
    { day: "Fri, 04 Jul", price: "₹3,399" },
  ];

  return (
    <div className="bg-white rounded-lg shadow flex divide-x divide-gray-200 items-stretch">
      {/* Left Scroll Button */}
      <div className="border-r border-gray-200 hover:bg-orange-100 transition-colors">
        <button
          onClick={() => handleScroll("left")}
          className="min-w-[80px] h-full flex flex-col items-center justify-center px-3 py-2 text-orange-600 font-medium"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>

      {/* Scrollable Dates */}
      <div
        ref={dateSliderRef}
        className="flex-1 overflow-x-auto"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        <div
          className="flex divide-x divide-gray-200 w-max h-full"
          style={{
            overflowY: "hidden",
          }}
        >
          {dates.map((date, index) => (
            <button
              key={index}
              className="min-w-[100px] h-full px-3 py-2 text-xs text-gray-600 hover:bg-orange-100 font-medium flex flex-col items-center justify-center"
            >
              {date.day}
              <span className="text-orange-600 text-sm font-semibold mt-1">
                {date.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Hide scrollbar (for Chrome) using overlay wrapper */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Right Scroll Button */}
      <div className="border-l border-gray-200 hover:bg-orange-100 transition-colors">
        <button
          onClick={() => handleScroll("right")}
          className="min-w-[80px] h-full flex flex-col items-center justify-center px-3 py-2 text-orange-600 font-medium"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
