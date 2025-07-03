import { useRef, useState, useEffect } from "react";

export const FlightDateSlider = ({ onDateSelect }) => {
  const dateSliderRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);

  // Generate next 7 days with sample prices
  useEffect(() => {
    const today = new Date();
    const newDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formatted = date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });

      return {
        dateStr: date.toISOString().split("T")[0], // YYYY-MM-DD
        display: formatted, // e.g. Mon, 02 Jul
        price: `₹${Math.floor(2999 + Math.random() * 1500)}`, // random price
      };
    });

    setDates(newDates);
    setSelectedDate(newDates[0]?.dateStr); // default select today
    onDateSelect?.(newDates[0]?.dateStr);
  }, []);

  const handleScroll = (direction) => {
    if (dateSliderRef.current) {
      const scrollAmount = 200;
      dateSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.dateStr);
    onDateSelect?.(date.dateStr); // pass to parent
  };

  return (
    <div className="bg-white rounded-lg shadow flex divide-x divide-gray-200 items-stretch">
      {/* Left Button */}
      <div className="border-r border-gray-200 hover:bg-orange-100 transition-colors">
        <button
          onClick={() => handleScroll("left")}
          className="min-w-[60px] h-full flex items-center justify-center px-2 py-2 text-orange-600"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>

      {/* Scrollable Dates */}
      <div
        ref={dateSliderRef}
        className="flex-1 overflow-x-auto no-scrollbar"
      >
        <div className="flex w-max h-full">
          {dates.map((date) => (
            <button
              key={date.dateStr}
              onClick={() => handleDateClick(date)}
              className={`min-w-[100px] h-full px-3 py-2 text-xs text-center flex flex-col justify-center items-center transition-all
                ${
                  selectedDate === date.dateStr
                    ? "bg-pink-100 text-pink-700 font-semibold"
                    : "hover:bg-orange-50 text-gray-700"
                }`}
            >
              {date.display}
              <span className="text-orange-600 text-sm font-bold mt-1">
                {date.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <div className="border-l border-gray-200 hover:bg-orange-100 transition-colors">
        <button
          onClick={() => handleScroll("right")}
          className="min-w-[60px] h-full flex items-center justify-center px-2 py-2 text-orange-600"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Hide scrollbar for Chrome */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
};
