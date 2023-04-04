import { NavLink } from "react-router-dom";
import Authorize from "./Authorize";

const Register = ({ onRegister, onLogOut }) => {
  return (
    <>
      <Authorize
        onAuthorize={onRegister}
        heading={"Регистрация"}
        textButton={"Зарегистрироваться"}
      />
      <div className="auth">
        <NavLink to="/sign-in" className="auth__sign-in" onClick={onLogOut}>
          Уже зарегистрированы? Войти
        </NavLink>
      </div>
    </>
  );
};

export default Register;
