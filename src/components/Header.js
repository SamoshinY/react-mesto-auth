import logo from "../images/Logo.svg";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
// import { CSSTransition } from "react-transition-group";

const Header = ({ email, onLogOut }) => {
  const currentDisplaying = window.matchMedia("(min-width: 560px)").matches;
  const [navOpen, setNavOpen] = useState(currentDisplaying);

  const handleClick = () => {
    onLogOut();
    currentDisplaying ? setNavOpen(true) : setNavOpen(false);
  };

  const handleBurgerClick = () => {
    setNavOpen(!navOpen);
  };

  const NavBar = () => {
    return (
      <div className="header__nav">
        <>
          {email && <p className="header__email">{email}</p>}
          {
            <Routes>
              <Route
                path="sign-up"
                element={
                  <Link to="/sign-in" className="header__link-text">
                    Войти
                  </Link>
                }
              />
              <Route
                path="sign-in"
                element={
                  <Link to="/sign-up" className="header__link-text">
                    Регистрация
                  </Link>
                }
              />
              <Route
                path="/"
                element={
                  <Link
                    to="/sign-in"
                    className="header__link-text"
                    onClick={handleClick}
                  >
                    Выйти
                  </Link>
                }
              />
            </Routes>
          }
        </>
      </div>
    );
  };

  const BurgerMenu = () => {
    return (
      <>
        {!navOpen && (
          <button
            type="button"
            className="header__burger"
            onClick={handleBurgerClick}
          >
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </button>
        )}
        {navOpen && (
          <button
            onClick={handleBurgerClick}
            type="button"
            className="header__burger-close"
          ></button>
        )}
      </>
    );
  };

  return (
    <header className="header">
      <div className="header__wrap">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        {email && <BurgerMenu />}
        {!email && <NavBar />}
      </div>
      {email && navOpen && <NavBar />}
    </header>
  );
};

export default Header;
