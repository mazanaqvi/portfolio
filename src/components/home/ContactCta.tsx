import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Copy, Mail, Phone } from "lucide-react";
import { site } from "../../data/site";
import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import { useCopy } from "../../hooks/useCopy";
import { IS_PRERENDER } from "../../lib/env";

const LAHORE_OFFSET_MIN = 5 * 60; // Pakistan has no daylight saving

function lahoreTime() {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: site.timezone }).format(new Date());
}

/** "4 h ahead of you", "9.5 h behind you" or "same time as you", from the visitor's own clock. */
function offsetFromVisitor() {
  const visitorOffset = -new Date().getTimezoneOffset();
  const diff = (LAHORE_OFFSET_MIN - visitorOffset) / 60;
  if (diff === 0) return "same time as you";
  const h = Math.abs(diff);
  return `${Number.isInteger(h) ? h : h.toFixed(1)} h ${diff > 0 ? "ahead of" : "behind"} you`;
}

const ContactCta: React.FC = () => {
  const copy = useCopy();
  const [clock, setClock] = useState(() => (IS_PRERENDER ? null : { time: lahoreTime(), offset: offsetFromVisitor() }));

  useEffect(() => {
    if (IS_PRERENDER) return;
    const id = window.setInterval(() => setClock({ time: lahoreTime(), offset: offsetFromVisitor() }), 20_000);
    return () => window.clearInterval(id);
  }, []);

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
                Open to full-time remote roles and a small number of freelance builds. I've worked remotely with teams
                in the US, UK, Singapore and Kuwait. Tell me what you're making and I'll reply within a day.
              </p>
              <div className="cta-actions">
                <Magnetic>
                  <a className="btn primary lg" href={mailto}>
                    <Mail /> Hire me
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
                  <Clock />
                </span>
                <span>
                  <span className="label">Lahore · UTC+5 · Remote</span>
                  <div className="value">
                    {clock ? (
                      <>
                        {clock.time} my time <span className="muted">· {clock.offset}</span>
                      </>
                    ) : (
                      "Pakistan Standard Time"
                    )}
                  </div>
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
