import brandIcon from "../../../assets/images/footer_icon.png";

export const BookingFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-900 to-pink-900 text-white py-6">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding + Copyright */}
        <div className="text-sm text-center md:text-left flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <img src={brandIcon} alt="FlyNow Icon" className="w-5 h-5 mix-blend-multiply" />
            <span className="font-semibold">
              <span className="text-white">Fly</span>
              <span className="text-yellow-400">Tix</span>
            </span>
          </div>
          <span className="text-yellow-300 hidden sm:inline">|</span>
          <span className="text-yellow-300">© 2025 FlyTix. All rights reserved.</span>
        </div>

        {/* Right: Contact Info + Social Icons */}
        <div className="text-sm text-center md:text-right flex items-center gap-4 flex-wrap">
          <p>
            <a href="mailto:support@flynow.com" className="text-yellow-300 hover:underline">
              support@flytix.com
            </a>
            <span className="mx-1 text-yellow-300">|</span>
            <span className="text-yellow-300">+91 98765 43210</span>
          </p>
          <div className="flex space-x-3 text-lg mt-1 md:mt-0">
            <a href="#" className="text-white hover:text-yellow-400 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-yellow-400 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
