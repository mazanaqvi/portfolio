import { ArrowUpRight, Copy, Mail, MapPin, Phone } from "lucide-react";
import { site } from "../../data/site";
import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import { useCopy } from "../../hooks/useCopy";

const ContactCta: React.FC = () => {
  const copy = useCopy();
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent("Hi Ali, I'd like to talk about…")}`;

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="contact-cta">
          <div className="cta-bg" />
          <div className="cta-inner">
            <div>
              <span className="mono">Let's talk</span>
              <h2 style={{ marginTop: "0.8rem" }}>
                Have an idea? <span className="em">Let's ship it.</span>
              </h2>
              <p>
                I take on a small number of freelance builds alongside full-time work. Tell me what you're making and
                I'll reply within a day.
              </p>
              <div className="cta-actions">
                <Magnetic>
                  <a className="btn primary lg" href={mailto}>
                    <Mail /> Start a project
                  </a>
                </Magnetic>
                <button type="button" className="btn ghost lg" onClick={() => copy(site.email, "Email copied")}>
                  <Copy /> Copy email
                </button>
              </div>
            </div>
            <div className="contact-list">
              <button type="button" className="contact-row" onClick={() => copy(site.email, "Email copied")}>
                <span className="ic">
                  <Mail />
                </span>
                <span>
                  <span className="label">Email</span>
                  <div className="value">{site.email}</div>
                </span>
                <span className="act">
                  <Copy />
                </span>
              </button>
              <a className="contact-row" href={`tel:${site.phoneHref}`}>
                <span className="ic">
                  <Phone />
                </span>
                <span>
                  <span className="label">Phone / WhatsApp</span>
                  <div className="value">{site.phone}</div>
                </span>
                <span className="act">
                  <ArrowUpRight />
                </span>
              </a>
              <div className="contact-row">
                <span className="ic">
                  <MapPin />
                </span>
                <span>
                  <span className="label">Location</span>
                  <div className="value">{site.location} · Remote worldwide</div>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactCta;
