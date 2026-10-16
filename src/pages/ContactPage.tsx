import { ArrowUpRight } from "lucide-react";
import { socials } from "../data/site";
import Reveal from "../components/ui/Reveal";
import ContactCta from "../components/home/ContactCta";
import { useSpotlight } from "../hooks/useSpotlight";

const SocialCard: React.FC<{ s: (typeof socials)[number]; i: number }> = ({ s, i }) => {
  const onMove = useSpotlight<HTMLAnchorElement>();
  return (
    <Reveal delay={i * 0.05}>
      <a className="card spotlight" href={s.url} target="_blank" rel="noopener noreferrer" onMouseMove={onMove}>
        <i className={s.icon} aria-hidden />
        <span>
          <span className="name">{s.name}</span>
          <span className="handle">{s.handle}</span>
        </span>
        <span className="arrow">
          <ArrowUpRight />
        </span>
      </a>
    </Reveal>
  );
};

const ContactPage: React.FC = () => (
  <>
    <div className="page" style={{ paddingBottom: 0 }}>
      <div className="container">
        <Reveal className="page-head">
          <span className="mono">Contact</span>
          <h1>
            Say <span className="em">hello</span>
          </h1>
          <p>Email is fastest. WhatsApp works too. I'm in Lahore (UTC+5) and usually reply the same day.</p>
        </Reveal>
        <div className="social-grid">
          {socials.map((s, i) => (
            <SocialCard key={s.name} s={s} i={i} />
          ))}
        </div>
      </div>
    </div>
    <ContactCta />
  </>
);

export default ContactPage;
