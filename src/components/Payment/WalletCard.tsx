import React, { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "../../utils/copyToClipboard";
import type { Wallet } from "../../data/payments";
import Reveal from "../ui/Reveal";

const WalletCard: React.FC<{ wallet: Wallet; index?: number }> = ({ wallet, index = 0 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(wallet.number.replace(/\s+/g, ""));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [wallet.number]);

  return (
    <Reveal delay={index * 0.06} className="pay-wallet-card" style={{ "--brand": wallet.brand } as React.CSSProperties}>
      <div className="pay-wallet-logo">
        <img src={wallet.logo} alt={`${wallet.name} logo`} loading="lazy" />
      </div>
      <div className="pay-wallet-info">
        <span className="pay-wallet-name">{wallet.name}</span>
        <span className="pay-wallet-holder">Ahmad Ali Hamza Naqvi</span>
        <span className="pay-wallet-number">{wallet.number}</span>
      </div>
      <button type="button" className={`pay-copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy} aria-label={`Copy ${wallet.name} number`}>
        {copied ? <Check /> : <Copy />}
        <span className="pay-copy-text">{copied ? "Copied" : "Copy"}</span>
      </button>
    </Reveal>
  );
};

export default WalletCard;
