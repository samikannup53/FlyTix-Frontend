import { Link } from "react-router-dom";
import logo from "../../../../../assets/images/logo.png";

export const AuthHeader = () => {
  return (
    <header className="p-4 sm:p-6 ">
      <Link to="/" className="inline-block w-fit">
        <img
          src={logo}
          alt="FlyTix Logo"
          className="w-20 sm:w-30 object-contain"
        />
      </Link>
    </header>
  );
};
