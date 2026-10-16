import React from "react";
import { Landmark, Smartphone } from "lucide-react";
import PaymentShell from "../components/Payment/PaymentShell";
import AccountCard from "../components/Payment/AccountCard";
import WalletCard from "../components/Payment/WalletCard";
import { banks, wallets } from "../data/payments";

const PaymentMethodPage: React.FC = () => (
  <PaymentShell subtitle="Local Pakistani bank accounts and digital wallets. Tap copy to grab any account number or IBAN instantly.">
    <div className="pay-section-heading">
      <Landmark /> Bank accounts
    </div>
    <div className="pay-grid">
      {banks.map((bank, i) => (
        <AccountCard key={bank.id} id={bank.id} name={bank.name} logo={bank.logo} brand={bank.brand} fields={bank.fields} preferred={bank.preferred} index={i} />
      ))}
    </div>
    <div className="pay-section-heading">
      <Smartphone /> Digital wallets
    </div>
    <div className="pay-wallets-grid">
      {wallets.map((wallet, i) => (
        <WalletCard key={wallet.id} wallet={wallet} index={i} />
      ))}
    </div>
  </PaymentShell>
);

export default PaymentMethodPage;
