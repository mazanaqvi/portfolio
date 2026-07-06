import React from "react";
import PaymentShell from "../components/Payment/PaymentShell";
import AccountCard from "../components/Payment/AccountCard";
import { internationalAccounts } from "../data/payments";

const PaymentInternationalPage: React.FC = () => {
  return (
    <PaymentShell subtitle="International receiving account via Payoneer. Tap copy to grab the account number, routing or SWIFT code instantly.">
      <div className="pay-section-heading anim-fade-up" style={{ animationDelay: "0.2s" }}>
        <i className="fas fa-earth-americas"></i>
        <span>International Transfer</span>
      </div>
      <div className="pay-grid pay-grid-wide">
        {internationalAccounts.map((account, i) => (
          <AccountCard
            key={account.id}
            name={account.name}
            logo={account.logo}
            brand={account.brand}
            fields={account.fields}
            note={account.note}
            index={i}
          />
        ))}
      </div>
    </PaymentShell>
  );
};

export default PaymentInternationalPage;
