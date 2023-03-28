import { NavLink } from "react-router-dom";
import Authorize from "./Autorize";

const Register = ({ onLogin }) => {
  return (
    <>
      <Authorize
        onAuthorize={onLogin}
        heading={"Регистрация"}
        textButton={"Зарегистрироваться"}
      />
      <div className="auth">
        <NavLink to="/sign-in" className="auth__sign-in">
          Уже зарегистрированы? Войти
        </NavLink>
      </div>
    </>
  );
};

export default Register;
