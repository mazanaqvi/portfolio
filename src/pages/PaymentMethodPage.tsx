import React from "react";
import PaymentShell from "../components/Payment/PaymentShell";
import AccountCard from "../components/Payment/AccountCard";
import WalletCard from "../components/Payment/WalletCard";
import { banks, wallets } from "../data/payments";

const PaymentMethodPage: React.FC = () => {
  return (
    <PaymentShell subtitle="Local Pakistani bank accounts and digital wallets. Tap copy to grab any account number or IBAN instantly.">
      <div className="pay-section-heading anim-fade-up" style={{ animationDelay: "0.2s" }}>
        <i className="fas fa-building-columns"></i>
        <span>Bank Accounts</span>
      </div>
      <div className="pay-grid">
        {banks.map((bank, i) => (
          <AccountCard
            key={bank.id}
            name={bank.name}
            logo={bank.logo}
            brand={bank.brand}
            fields={bank.fields}
            preferred={bank.preferred}
            index={i}
          />
        ))}
      </div>

      <div className="pay-section-heading anim-fade-up">
        <i className="fas fa-mobile-screen-button"></i>
        <span>Digital Wallets</span>
      </div>
      <div className="pay-wallets-grid">
        {wallets.map((wallet, i) => (
          <WalletCard key={wallet.id} wallet={wallet} index={i} />
        ))}
      </div>
    </PaymentShell>
  );
};

export default PaymentMethodPage;
