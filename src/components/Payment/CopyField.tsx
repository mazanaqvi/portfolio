import React, { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "../../utils/copyToClipboard";
import type { PaymentField } from "../../data/payments";

const CopyField: React.FC<{ field: PaymentField }> = ({ field }) => {
  const [copied, setCopied] = useState(false);
  const canCopy = field.copyable !== false;
  const textToCopy = field.copyValue ?? field.value.replace(/\s+/g, "");

  const handleCopy = useCallback(async () => {
    await copyToClipboard(textToCopy);
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
            {copied ? <Check /> : <Copy />}
            <span className="pay-copy-text">{copied ? "Copied" : "Copy"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CopyField;
