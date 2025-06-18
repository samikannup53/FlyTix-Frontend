import { LandingFooter } from "../../components";
import { UserHeader } from "../../components/UserHeader";
import { HeroSection } from "./sections/Hero";
import { PopularAirlines } from "./sections/PopularAirlines";

export const Landing = () => {
  return (
    <>
      <UserHeader />
      <HeroSection />
      <PopularAirlines />
      <LandingFooter />
    </>
  );
};
