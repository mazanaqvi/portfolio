import Hero from "../components/home/Hero";
import TechStrip from "../components/home/TechStrip";
import FeaturedWork from "../components/home/FeaturedWork";
import StoreLedger from "../components/home/StoreLedger";
import NowSection from "../components/home/NowSection";
import Experience from "../components/home/Experience";
import Skills from "../components/home/Skills";
import Testimonials from "../components/home/Testimonials";
import ContactCta from "../components/home/ContactCta";
import { pageSeo } from "../data/seo";
import { useSeo } from "../hooks/useSeo";

const HomePage: React.FC = () => {
  useSeo(pageSeo.home);
  return (
    <>
      <Hero />
      <TechStrip />
      <FeaturedWork />
      <StoreLedger />
      <NowSection />
      <Experience compact />
      <Skills />
      <Testimonials />
      <ContactCta />
    </>
  );
};

export default HomePage;
