import Hero from "../components/home/Hero";
import TechStrip from "../components/home/TechStrip";
import FeaturedWork from "../components/home/FeaturedWork";
import Experience from "../components/home/Experience";
import Skills from "../components/home/Skills";
import Testimonials from "../components/home/Testimonials";
import ContactCta from "../components/home/ContactCta";

const HomePage: React.FC = () => (
  <>
    <Hero />
    <TechStrip />
    <FeaturedWork />
    <Experience compact />
    <Skills />
    <Testimonials />
    <ContactCta />
  </>
);

export default HomePage;
