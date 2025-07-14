import { useRef } from "react";
import { Features } from "./sections/Features";
import { LandingFooter } from "../../components";
import { UserHeader } from "../../components/UserHeader";
import { HeroSection } from "./sections/Hero";
import { PopularAirlines } from "./sections/PopularAirlines";
import { Benefits } from "./sections/Benefits";
import { PopularRoutes } from "./sections/PopularRoutes";
import { Deals } from "./sections/Deals";

export const Landing = () => {
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const dealsRef = useRef(null);
  const routesRef = useRef(null);
  const airlinesRef = useRef(null);

  return (
    <>
      <UserHeader
        onNavigate={(section) => {
          const refs = {
            features: featuresRef,
            benefits: benefitsRef,
            deals: dealsRef,
            routes: routesRef,
            airlines: airlinesRef,
          };
          refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <HeroSection />
      <main className="bg-gradient-to-tr from-orange-50/50 via-pink-50/50 to-orange-50/50">
        <div ref={featuresRef}><Features /></div>
        <div ref={benefitsRef}><Benefits /></div>
        <div ref={dealsRef}><Deals /></div>
        <div ref={routesRef}><PopularRoutes /></div>
        <div ref={airlinesRef}><PopularAirlines /></div>
      </main>
      <LandingFooter />
    </>
  );
};
