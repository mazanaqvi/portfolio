import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { site } from "../../data/site";
import ThemeToggle from "../layout/ThemeToggle";
import Cursor from "../layout/Cursor";

const PaymentLayout: React.FC = () => (
  <>
    <Cursor />
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <img className="brand-mark" src="/img/hero.png" alt="" width={30} height={30} />
          <span>{site.name}</span>
        </Link>
        <div className="nav-actions">
          <Link to="/" className="btn ghost sm">
            <ArrowLeft /> Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
    <Outlet />
  </>
);

export default PaymentLayout;
