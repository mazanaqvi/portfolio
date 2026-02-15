import { contactInfo, contactSocialLinks } from "../data/socialLinks";

const ContactPage: React.FC = () => {
  return (
    <section className="container contact active" id="contact">
      <div className="contact-container">
        <div className="page-header anim-fade-up">
          <span className="page-tag"><i className="fas fa-envelope-open"></i> Contact</span>
          <h2 className="page-title">
            Get In <span className="highlight">Touch</span>
          </h2>
          <p className="page-subtitle">
            Ready to bring your ideas to life? Let's build something amazing together.
          </p>
        </div>

        <div className="contact-content-con">
          <div className="contact-main">
            <div className="contact-info-grid anim-fade-up" style={{ animationDelay: "0.2s" }}>
              <a
                href={`mailto:${contactInfo.email}`}
                className="contact-card clickable"
              >
                <div className="contact-icon-wrapper">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email Address</h4>
                  <p>{contactInfo.email}</p>
                </div>
              </a>

              <a
                href={`tel:${contactInfo.phoneHref}`}
                className="contact-card clickable"
              >
                <div className="contact-icon-wrapper">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h4>Phone Number</h4>
                  <p>{contactInfo.phone}</p>
                </div>
              </a>

              <div className="contact-card">
                <div className="contact-icon-wrapper">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>{contactInfo.location}</p>
                </div>
              </div>

              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card clickable"
              >
                <div className="contact-icon-wrapper">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="contact-details">
                  <h4>Professional Network</h4>
                  <p>Connect on LinkedIn</p>
                </div>
              </a>
            </div>

            <div className="social-connect anim-fade-up" style={{ animationDelay: "0.4s" }}>
              <h4>Follow Me</h4>
              <div className="social-links">
                {contactSocialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${link.cssClass}`}
                  >
                    <i className={link.icon}></i>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="contact-cta-bottom anim-fade-up" style={{ animationDelay: "0.6s" }}>
          <div className="cta-container">
            <div className="cta-left">
              <div className="cta-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <div className="cta-text">
                <h3>Ready to Start Your Project?</h3>
                <p>
                  Let's discuss your ideas and build something amazing together!
                </p>
              </div>
            </div>
            <div className="cta-right">
              <div className="cta-buttons">
                <a
                  href={`mailto:${contactInfo.email}?subject=Project Inquiry&body=Hi Ali, I'm interested in discussing a project with you.`}
                  className="primary-cta-btn"
                >
                  <i className="fas fa-envelope"></i>
                  <span>Start Project</span>
                </a>
                <a
                  href={`tel:${contactInfo.phoneHref}`}
                  className="secondary-cta-btn"
                >
                  <i className="fas fa-phone"></i>
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
