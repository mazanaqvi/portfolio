import React, { useCallback, useState } from "react";
import type { PaymentField } from "../../data/payments";

interface CopyFieldProps {
  field: PaymentField;
}

const CopyField: React.FC<CopyFieldProps> = ({ field }) => {
  const [copied, setCopied] = useState(false);
  const canCopy = field.copyable !== false;
  const textToCopy = field.copyValue ?? field.value.replace(/\s+/g, "");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const el = document.createElement("textarea");
      el.value = textToCopy;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [textToCopy]);

  return (
    <div className="pay-field">
      <span className="pay-field-label">{field.label}</span>
      <div className="pay-field-value-row">
        <span className="pay-field-value">{field.value}</span>
        {canCopy && (
          <button
            type="button"
            className={`pay-copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            aria-label={`Copy ${field.label}`}
            title={copied ? "Copied!" : `Copy ${field.label}`}
          >
            <i className={copied ? "fas fa-check" : "far fa-copy"}></i>
            <span className="pay-copy-text">{copied ? "Copied" : "Copy"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CopyField;
