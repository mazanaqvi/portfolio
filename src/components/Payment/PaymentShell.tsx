import React from "react";
import { NavLink } from "react-router-dom";
import { Flag, Globe, Mail, Phone, TriangleAlert } from "lucide-react";
import Reveal from "../ui/Reveal";

interface PaymentShellProps {
  subtitle: string;
  children: React.ReactNode;
}

const PaymentShell: React.FC<PaymentShellProps> = ({ subtitle, children }) => (
  <div className="page pay-page">
    <div className="container">
      <Reveal className="page-head">
        <span className="mono">Payment methods</span>
        <h1>
          Pay <span className="em">Ahmad Ali Hamza</span>
        </h1>
        <p>{subtitle}</p>
      </Reveal>

      <Reveal delay={0.05} className="pay-contact">
        <a className="pay-contact-item" href="tel:+923033999512">
          <Phone /> 0303 3999512
        </a>
        <a className="pay-contact-item" href="mailto:alihumza.dev@gmail.com">
          <Mail /> alihumza.dev@gmail.com
        </a>
      </Reveal>

      <Reveal delay={0.08} className="pay-toggle" role="tablist">
        <NavLink to="/payment-method" end className={({ isActive }) => `pay-toggle-btn ${isActive ? "active" : ""}`}>
          <Flag /> Local — Pakistan
        </NavLink>
        <NavLink to="/payment-method/international" className={({ isActive }) => `pay-toggle-btn ${isActive ? "active" : ""}`}>
          <Globe /> International
        </NavLink>
      </Reveal>

      <Reveal delay={0.1} className="pay-warning" role="note">
        <TriangleAlert />
        <p>
          Before sending, make sure your bank shows the account title as <strong>Ahmad Ali Hamza</strong> or{" "}
          <strong>Ahmad Ali Hamza Naqvi</strong>. If it shows any other name, do not send. Confirm with me on{" "}
          <a href="tel:+923033999512">0303 3999512</a>. The only official page is{" "}
          <strong>alihumza.com/payment-method</strong>.
        </p>
      </Reveal>

      {children}
    </div>
  </div>
);

export default PaymentShell;
