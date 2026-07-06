import React, { useCallback, useState } from "react";
import type { Wallet } from "../../data/payments";

interface WalletCardProps {
  wallet: Wallet;
  index?: number;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, index = 0 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const value = wallet.number.replace(/\s+/g, "");
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [wallet.number]);

  return (
    <div
      className="pay-wallet-card anim-fade-up"
      style={
        {
          animationDelay: `${0.1 + index * 0.06}s`,
          "--brand": wallet.brand,
        } as React.CSSProperties
      }
    >
      <div className="pay-wallet-logo">
        <img src={wallet.logo} alt={`${wallet.name} logo`} loading="lazy" />
      </div>
      <div className="pay-wallet-info">
        <span className="pay-wallet-name">{wallet.name}</span>
        <span className="pay-wallet-holder">Ahmad Ali Hamza Naqvi</span>
        <span className="pay-wallet-number">{wallet.number}</span>
      </div>
      <button
        type="button"
        className={`pay-copy-btn pay-wallet-copy ${copied ? "copied" : ""}`}
        onClick={handleCopy}
        aria-label={`Copy ${wallet.name} number`}
        title={copied ? "Copied!" : `Copy ${wallet.name} number`}
      >
        <i className={copied ? "fas fa-check" : "far fa-copy"}></i>
        <span className="pay-copy-text">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
};

export default WalletCard;
