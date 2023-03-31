import logo from "../images/Logo.svg";
import { useState } from "react";

const Header = ({ onlogOut, userData, loggedIn, onAuth, buttonText }) => {
  const currentDisplaying = window.matchMedia("(min-width: 560px)");
  const [isListOpen, setIsListOpen] = useState(currentDisplaying.matches);

  const handleBurgerClick = () => {
    setIsListOpen(!isListOpen);
  };
  const Burger = () => {
    return (
      <button
        type="button"
        className="header__burger"
        onClick={handleBurgerClick}
      >
        <span className="header__burger-line"></span>
        <span className="header__burger-line"></span>
        <span className="header__burger-line"></span>
      </button>
    );
  };

  const CloseList = () => {
    return (
      <button
        onClick={handleBurgerClick}
        type="button"
        className="header__burger-close"
      ></button>
    );
  };

  return (
    <header className="header">
      <div className="header__wrap">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        {!isListOpen && <Burger />}
        {isListOpen && <CloseList />}
      </div>
      {isListOpen && (
        <div className="header__nav">
          {loggedIn && <p className="header__email">{userData.email}</p>}
          {loggedIn && (
            <button
              className="header__link-text"
              type="button"
              onClick={onlogOut}
            >
              Выйти
            </button>
          )}
          {!loggedIn && (
            <button
              className="header__link-text"
              type="button"
              onClick={onAuth}
            >
              {buttonText}
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
