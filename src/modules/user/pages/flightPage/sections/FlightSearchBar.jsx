import swapIcon from "../../../../../assets/images/swap.png";

export const FlightSearchBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-900 to-pink-900 text-white shadow-xl">
      <div className="max-w-[1600px] mx-auto p-5">
        {/* Trip Type Toggle */}
        <div className="flex gap-3 mb-3">
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white/40 rounded-full bg-transparent hover:bg-white/20 transition-all">
            <i className="fa-solid fa-arrow-right"></i> One Way
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-white/40 rounded-full bg-transparent hover:bg-white/20 transition-all">
            <i className="fa-solid fa-retweet"></i> Round Trip
          </button>
        </div>

        {/* Input Fields */}
        <div className="flex flex-wrap sm:flex-nowrap gap-1 items-stretch">
          {/* From */}
          <div className="relative flex-1 px-2 py-1.5 bg-white/20 rounded-l-lg border-b-4 border-transparent transition-all focus-within:border-yellow-300">
            <label className="block text-xs text-white mb-1">From</label>
            <input
              type="text"
              defaultValue="Chennai"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
            {/* Swap Icon */}
            <div className="absolute top-4 -right-4 z-10">
              <button
                className="bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white p-1 rounded-full shadow-lg"
                title="Swap"
              >
                <img src={swapIcon} alt="swap" className="w-6" />
              </button>
            </div>
          </div>

          {/* To */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent transition-all focus-within:border-yellow-300">
            <label className="block text-xs text-white mb-1 ml-3">To</label>
            <input
              type="text"
              defaultValue="Trivandrum"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70 ml-3"
            />
          </div>

          {/* Departure */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent transition-all focus-within:border-yellow-300">
            <label className="block text-xs text-white mb-1">Departure</label>
            <input
              type="text"
              defaultValue="27 Jun 2025"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
          </div>

          {/* Return */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent transition-all focus-within:border-yellow-300">
            <label className="block text-xs text-white mb-1">Return</label>
            <input
              type="text"
              defaultValue="--"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
          </div>

          {/* Passengers & Class */}
          <div className="flex-1 px-2 py-1.5 bg-white/20 border-b-4 border-transparent transition-all focus-within:border-yellow-300">
            <label className="block text-xs text-white mb-1">
              Passengers & Class
            </label>
            <input
              type="text"
              defaultValue="1 Adult · Economy"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
            />
          </div>

          {/* Search Button */}
          <div>
            <button className="h-full px-5 py-1.5 text-sm font-semibold text-white bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-r-lg shadow transition-all flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass"></i>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
