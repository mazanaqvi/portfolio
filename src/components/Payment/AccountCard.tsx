import React, { useCallback, useState } from "react";
import type { PaymentField } from "../../data/payments";
import { copyToClipboard } from "../../utils/copyToClipboard";
import CopyField from "./CopyField";

interface AccountCardProps {
  id: string;
  name: string;
  logo: string;
  logoFit?: "cover" | "contain";
  brand: string;
  fields: PaymentField[];
  preferred?: boolean;
  note?: string;
  index?: number;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  name,
  logo,
  logoFit = "cover",
  brand,
  fields,
  preferred,
  note,
  index = 0,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = useCallback(async () => {
    const lines = fields.map((f) => `${f.label}: ${f.value}`);
    await copyToClipboard([name, ...lines].join("\n"));
    setCopiedAll(true);
    window.setTimeout(() => setCopiedAll(false), 1600);
  }, [name, fields]);

  return (
    <div
      className={`pay-card pay-card-${id} anim-fade-up`}
      style={
        {
          animationDelay: `${0.1 + index * 0.08}s`,
          "--brand": brand,
        } as React.CSSProperties
      }
    >
      <div className="pay-card-head">
        <div className={`pay-logo-wrap ${logoFit === "contain" ? "pay-logo-plain" : ""}`}>
          <img
            src={logo}
            alt={`${name} logo`}
            loading="lazy"
            style={{ objectFit: logoFit }}
          />
        </div>
        <div className="pay-card-title">
          <h3 className="pay-card-name">{name}</h3>
          {preferred && <span className="pay-preferred-tag">Preferred</span>}
        </div>
        <button
          type="button"
          className={`pay-copy-all-btn ${copiedAll ? "copied" : ""}`}
          onClick={handleCopyAll}
          aria-label={`Copy all ${name} details`}
        >
          <i className={copiedAll ? "fas fa-check" : "far fa-copy"}></i>
          <span>{copiedAll ? "Copied" : "Copy all"}</span>
        </button>
      </div>

      <div className="pay-card-body">
        {note && <p className="pay-card-note">{note}</p>}

        <div className="pay-fields">
          {fields.map((field) => (
            <CopyField key={field.label} field={field} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
