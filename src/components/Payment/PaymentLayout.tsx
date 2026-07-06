import { Outlet } from "react-router-dom";
import ThemeToggle from "../Layout/ThemeToggle";

const PaymentLayout: React.FC = () => {
  return (
    <div className="main-content">
      <Outlet />
      <ThemeToggle />
    </div>
  );
};

export default PaymentLayout;
