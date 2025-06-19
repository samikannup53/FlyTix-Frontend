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
      <main className="bg-gradient-to-tr from-orange-50/50 via-pink-50/50 to-orange-50/50">
        <Features />
        <Benefits />
        <Deals />
        <PopularRoutes />
        <PopularAirlines />
      </main>
      <LandingFooter />
    </>
  );
};
