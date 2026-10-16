import React from "react";
import { Earth } from "lucide-react";
import PaymentShell from "../components/Payment/PaymentShell";
import AccountCard from "../components/Payment/AccountCard";
import { internationalAccounts } from "../data/payments";

const PaymentInternationalPage: React.FC = () => (
  <PaymentShell subtitle="International receiving account via Payoneer. Tap copy to grab the account number, routing or SWIFT code instantly.">
    <div className="pay-section-heading">
      <Earth /> International transfer
    </div>
    <div className="pay-grid pay-grid-wide">
      {internationalAccounts.map((account, i) => (
        <AccountCard key={account.id} id={account.id} name={account.name} logo={account.logo} logoFit={account.logoFit} brand={account.brand} fields={account.fields} note={account.note} index={i} />
      ))}
    </div>
  </PaymentShell>
);

export default PaymentInternationalPage;
