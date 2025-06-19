import footerLogo from "../../../assets/images/footer_logo.png";

export const LandingFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-900 to-pink-900 text-white pt-12 pb-6">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row gap-10">
        {/* Left: Brand Info */}
        <div className="w-full md:w-1/3">
          <img
            src={footerLogo}
            alt="FlyTix Logo"
            className="w-24 sm:w-28 object-contain"
          />
          <p className="mt-3 text-sm">
            Fly smarter with{" "}
            <span className="font-semibold text-yellow-300">FlyTix</span> – your
            trusted travel partner.
          </p>
          <p className="mt-2 text-yellow-300 text-sm">
            Easy bookings, real-time updates, and top deals in one place.
          </p>
        </div>

        {/* Right: Links, Routes, Socials */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Flight Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Compare Prices
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Manage Booking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Account
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">
              Popular Routes
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Chennai → Bangalore</li>
              <li>Delhi → Mumbai</li>
              <li>Hyderabad → Coimbatore</li>
              <li>Mumbai → Trichy</li>
            </ul>
          </div>

          {/* Social and Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">
              Connect With Us
            </h4>
            <div className="flex space-x-4 mt-2 text-xl">
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <p className="mt-4 text-sm text-yellow-200">
              Email:{" "}
              <a
                href="mailto:support@flynow.com"
                className="text-yellow-300 hover:underline"
              >
                support@flynow.com
              </a>
            </p>
            <p className="text-sm text-yellow-200">
              Phone: <span className="text-yellow-300">+91 98765 43210</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 text-sm text-yellow-300 border-t border-yellow-700 pt-4">
        © 2025 <span className="text-white font-semibold">FlyNow</span>. All
        rights reserved.
      </div>
    </footer>
  );
};
