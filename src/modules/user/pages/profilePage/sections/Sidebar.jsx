import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="w-full md:w-1/4 bg-gradient-to-r from-orange-900 to-pink-900 text-white py-8 px-4">
      {/* Sidebar Title */}
      <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-orange-300 tracking-wide">
        User Dashboard
      </h3>

      {/* Navigation */}
      <nav className="space-y-4">
        <Link
          to="/profile"
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-800 transition"
        >
          <i className="fas fa-user-circle text-lg"></i>
          <span className="font-medium">Profile</span>
        </Link>

        <Link
          to="/travellers"
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-800 transition"
        >
          <i className="fas fa-users text-lg"></i>
          <span className="font-medium">Travellers</span>
        </Link>

        <Link
          to="/change-password"
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-800 transition"
        >
          <i className="fas fa-key text-lg"></i>
          <span className="font-medium">Change Password</span>
        </Link>
      </nav>
    </aside>
  );
};

