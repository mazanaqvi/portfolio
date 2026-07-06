import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface PaymentShellProps {
  subtitle: string;
  children: React.ReactNode;
}

const PaymentShell: React.FC<PaymentShellProps> = ({ subtitle, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`container pay-page ${visible ? "page-visible" : ""}`}>
      <div className="page-header anim-fade-up">
        <span className="page-tag">
          <i className="fas fa-wallet"></i> Payment Methods
        </span>
        <h2 className="page-title">
          Pay <span className="highlight">Ahmad Ali Hamza</span>
        </h2>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      <div className="pay-contact-heading anim-fade-up" style={{ animationDelay: "0.08s" }}>
        <i className="fas fa-headset"></i>
        <span>Contact</span>
      </div>

      <div className="pay-contact anim-fade-up" style={{ animationDelay: "0.1s" }}>
        <a className="pay-contact-item" href="tel:+923033999512">
          <i className="fas fa-phone"></i>
          <span>0303 3999512</span>
        </a>
        <a className="pay-contact-item" href="mailto:alihumza.dev@gmail.com">
          <i className="fas fa-envelope"></i>
          <span>alihumza.dev@gmail.com</span>
        </a>
      </div>

      <div
        className="pay-toggle anim-fade-up"
        style={{ animationDelay: "0.15s" }}
        role="tablist"
      >
        <NavLink
          to="/payment-method"
          end
          className={({ isActive }) =>
            `pay-toggle-btn ${isActive ? "active" : ""}`
          }
        >
          <i className="fas fa-flag"></i> Local — Pakistan
        </NavLink>
        <NavLink
          to="/payment-method/international"
          className={({ isActive }) =>
            `pay-toggle-btn ${isActive ? "active" : ""}`
          }
        >
          <i className="fas fa-globe"></i> International
        </NavLink>
      </div>

      {children}
    </section>
  );
};

export default PaymentShell;
