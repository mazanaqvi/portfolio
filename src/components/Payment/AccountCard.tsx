import React from "react";
import type { PaymentField } from "../../data/payments";
import CopyField from "./CopyField";

interface AccountCardProps {
  name: string;
  logo: string;
  brand: string;
  fields: PaymentField[];
  preferred?: boolean;
  note?: string;
  index?: number;
}

const AccountCard: React.FC<AccountCardProps> = ({
  name,
  logo,
  brand,
  fields,
  preferred,
  note,
  index = 0,
}) => {
  return (
    <div
      className={`pay-card anim-fade-up ${preferred ? "pay-card-preferred" : ""}`}
      style={
        {
          animationDelay: `${0.1 + index * 0.08}s`,
          "--brand": brand,
        } as React.CSSProperties
      }
    >
      {preferred && (
        <div className="pay-preferred-badge">
          <i className="fas fa-star"></i> Preferred
        </div>
      )}
      <div className="pay-card-head">
        <div className="pay-logo-wrap">
          <img src={logo} alt={`${name} logo`} loading="lazy" />
        </div>
        <h3 className="pay-card-name">{name}</h3>
      </div>

      {note && <p className="pay-card-note">{note}</p>}

      <div className="pay-fields">
        {fields.map((field) => (
          <CopyField key={field.label} field={field} />
        ))}
      </div>
    </div>
  );
};

export default AccountCard;
