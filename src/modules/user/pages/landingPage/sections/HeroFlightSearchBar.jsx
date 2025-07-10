import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swapIcon from "../../../../../assets/images/swap.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const HeroFlightSearchBar = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("ECONOMY");

  useEffect(() => {
    if (tripType === "oneway") setReturnDate(null);
  }, [tripType]);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    if (!from || !to || !departureDate || (tripType === "roundtrip" && !returnDate)) {
      alert("Please fill all required fields");
      return;
    }

    const meta = {
      tripType,
      from,
      to,
      date: departureDate.toISOString(),
      returnDate: returnDate ? returnDate.toISOString() : null,
      adults: passengers,
      children: 0,
      infants: 0,
      travelClass,
    };

    localStorage.setItem("searchMeta", JSON.stringify(meta));
    navigate("/flights");
  };

  return (
    <div className="max-w-[1500px] mx-auto hidden sm:flex absolute inset-x-0 -bottom-20 justify-center z-20 px-4 md:px-8">
      <div className="bg-gradient-to-r from-orange-800 via-pink-800 to-pink-900 text-white border border-white/20 rounded-2xl p-5 sm:p-6 w-full max-w-7xl shadow-xl backdrop-blur-md">
        {/* Trip Type */}
        <div className="flex flex-wrap gap-3 mb-5">
          {["oneway", "roundtrip"].map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white/30 rounded-full transition-all ${
                tripType === type ? "bg-white/20" : "hover:bg-white/20"
              }`}
            >
              <i className={`fa-solid ${type === "oneway" ? "fa-arrow-right" : "fa-retweet"}`}></i>
              {type === "oneway" ? "One Way" : "Round Trip"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {/* From */}
          <div className="relative flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent rounded-l-xl focus-within:border-yellow-300 transition-all">
            <label className="block text-xs font-medium text-white mb-1">From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Departure City"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
            <div className="absolute top-4 -right-4 z-10 hidden sm:block">
              <button
                onClick={handleSwap}
                className="bg-gradient-to-br from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white p-1 rounded-full shadow-lg"
                title="Swap"
              >
                <img src={swapIcon} className="w-5" alt="Swap" />
              </button>
            </div>
          </div>

          {/* To */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
            <label className="ml-2 block text-xs font-medium text-white mb-1">To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination City"
              className="w-full ml-2 bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
          </div>

          {/* Departure */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
            <label className="block text-xs font-medium text-white mb-1">Departure</label>
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 60))}
              placeholderText="Select Date"
              className="w-full bg-transparent text-sm text-white outline-none"
              wrapperClassName="w-full"
            />
          </div>

          {/* Return */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
            <label className="block text-xs font-medium text-white mb-1">Return</label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              minDate={departureDate || new Date()}
              maxDate={
                departureDate
                  ? new Date(new Date(departureDate).setDate(new Date(departureDate).getDate() + 60))
                  : new Date(new Date().setDate(new Date().getDate() + 60))
              }
              disabled={tripType !== "roundtrip"}
              placeholderText="Select Date"
              className="w-full bg-transparent text-sm text-white outline-none"
              wrapperClassName="w-full"
            />
          </div>

          {/* Passengers & Class */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent focus-within:border-yellow-300 transition-all">
            <label className="block text-xs font-medium text-white mb-1">Passengers & Class</label>
            <input
              type="text"
              readOnly
              value={`${passengers} Adult${passengers > 1 ? "s" : ""} · ${
                travelClass === "ECONOMY"
                  ? "Economy"
                  : travelClass.replace("_", " ")
              }`}
              onClick={() =>
                setPassengers((prev) => (prev < 10 ? prev + 1 : 1))
              }
              className="w-full bg-transparent text-sm text-white outline-none cursor-pointer placeholder:text-white/70"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-center">
            <button
              onClick={handleSearch}
              className="h-full w-full px-5 py-2 lg:text-xl font-semibold text-white bg-gradient-to-br from-rose-600 via-rose-600 to-orange-700 hover:opacity-90 rounded-r-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-magnifying-glass"></i>{" "}
              <span className="hidden lg:block">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
