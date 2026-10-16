import Reveal from "./Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  action?: React.ReactNode;
}

const SectionHead: React.FC<SectionHeadProps> = ({ eyebrow, title, text, action }) => (
  <Reveal className="section-head">
    <div>
      <span className="mono">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p style={{ marginTop: "0.8rem" }}>{text}</p>}
    </div>
    {action}
  </Reveal>
);

export default SectionHead;
