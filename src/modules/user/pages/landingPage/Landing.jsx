import { Features } from "./sections/Features";
import { LandingFooter } from "../../components";
import { UserHeader } from "../../components/UserHeader";
import { HeroSection } from "./sections/Hero";
import { PopularAirlines } from "./sections/PopularAirlines";
import { Benefits } from "./sections/Benefits";

export const Landing = () => {
  return (
    <>
      <UserHeader />
      <HeroSection />
      <Features />
      <Benefits />
      <PopularAirlines />
      <LandingFooter />
    </>
  );
};
