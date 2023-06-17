import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/logo_v3.svg";

const Header = () => {
  return (
    <div className="header">
      <div>
        <Logo className="logo-svg" />
        <h1>YourAstra</h1>
      </div>
    </div>
  );
};

export default Header;
