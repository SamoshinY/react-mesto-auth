import logo from "../images/Logo.svg";

const Header = ({ onlogOut, userData, loggedIn, onAuth, buttonText }) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div className="header__wrap">
        {loggedIn && <p className="header__email">{userData.email}</p>}
        {loggedIn && <button className="header__link-text" type="button" onClick={onlogOut}>Выйти</button>}
        {!loggedIn && <button className="header__link-text" type="button" onClick={onAuth}>{buttonText}</button>}
      </div>
    </header>
  );
}

export default Header;
