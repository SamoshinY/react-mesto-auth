import Authorize from "./Autorize";

const Login = ({ onLogin }) => {
  return (
    <Authorize onAuthorize={onLogin} heading={"Вход"} textButton={"Войти"} />
  );
};

export default Login;
