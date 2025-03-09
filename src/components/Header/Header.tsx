import './Header.style.scss'
import Menu from "../Menu";
import SubMenu from "../SubMenu";
const Header = () => {
  return (
    <header className="header">
      <SubMenu />
      <Menu />
    </header>
  );
};

export default Header;
