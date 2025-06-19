import { Features } from "./sections/Features";
import { LandingFooter } from "../../components";
import { UserHeader } from "../../components/UserHeader";
import { HeroSection } from "./sections/Hero";
import { PopularAirlines } from "./sections/PopularAirlines";
import { Benefits } from "./sections/Benefits";
import { PopularRoutes } from "./sections/PopularRoutes";
import { Deals } from "./sections/Deals";

export const Landing = () => {
  return (
    <>
      <UserHeader />
      <HeroSection />
      <Features />
      <Benefits />
      <Deals />
      <PopularRoutes />
      <PopularAirlines />
      <LandingFooter />
    </>
  );
};
