import mapImage from "../../../../../assets/images/map.png";

const avatarImages = [
  { src: "https://randomuser.me/api/portraits/men/32.jpg", className: "top-6 left-8 w-16 sm:w-20 h-16 sm:h-20 border-yellow-300 shadow-lg" },
  { src: "https://randomuser.me/api/portraits/men/45.jpg", className: "top-24 left-[150px] sm:left-[220px] w-10 sm:w-12 h-10 sm:h-12 border-blue-200 shadow" },
  { src: "https://randomuser.me/api/portraits/men/12.jpg", className: "top-[180px] right-4 w-10 sm:w-12 h-10 sm:h-12 border-orange-200 shadow-md" },
  { src: "https://randomuser.me/api/portraits/women/55.jpg", className: "bottom-10 right-16 sm:right-20 w-12 sm:w-14 h-12 sm:h-14 border-white shadow-md" },
  { src: "https://randomuser.me/api/portraits/women/22.jpg", className: "bottom-[120px] left-[100px] sm:left-[200px] w-10 sm:w-11 h-10 sm:h-11 border-pink-200 shadow" },
  { src: "https://randomuser.me/api/portraits/women/10.jpg", className: "top-10 right-1/4 w-14 sm:w-16 h-14 sm:h-16 border-yellow-200 shadow-lg" },
  { src: "https://randomuser.me/api/portraits/men/66.jpg", className: "bottom-6 left-8 sm:left-10 w-12 sm:w-14 h-12 sm:h-14 border-white shadow-md" },
];

export const AuthLeftPanel = ({title, subtitle, quote}) => {
  return (
    <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-6 bg-gradient-to-br from-orange-800 to-pink-900">
      {/* Background Map Image */}
      <img
        src={mapImage}
        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-30 z-10"
        alt="Travel Background"
      />
      {/* Avatars */}
      {avatarImages.map((avatar, index) => (
        <img
          key={index}
          src={avatar.src}
          className={`absolute rounded-full border-2 z-20 ${avatar.className}`}
          alt={`Avatar${index}`}
        />
      ))}

      {/* Customizable Text Contents */}
      <div className="relative z-30 px-4 sm:px-6 text-center max-w-sm sm:max-w-md space-y-4 sm:space-y-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg leading-tight">
          {title}
        </h1>
        <p className="text-white text-sm sm:text-base font-light leading-relaxed drop-shadow-sm">
          {subtitle}
        </p>
        <p className="text-yellow-300 text-xs sm:text-sm font-extralight italic drop-shadow-sm">
          <i className="fas fa-quote-left text-yellow-300 text-xl sm:text-2xl"></i> &nbsp;
          {quote}
        </p>
      </div>
    </div>
  );
};
