import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

export const useAuthorize = (handleInfoTooltip) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authResult, setAuthResult] = useState(false);
  const [headerButtonText, setHeaderButtonText] = useState("Регистрация");

  const checkToken = useCallback(async () => {
    try {
      const jwt = localStorage.getItem("token");
      if (!jwt) {
        throw new Error("Нет токена");
      }
      const user = await Auth.getContent(jwt);
      if (!user) {
        throw new Error("Нет данных");
      }
      setLoggedIn(true);
      navigate("/", { replace: true });
      setUserData(user.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    try {
      const data = await Auth.authorize(values);
      if (!data) {
        throw new Error("Ошибка аутентификации");
      }
      if (data) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
      }
      navigate("/", { replace: true });
      setUserData(values);
    } catch (err) { /*блок catch здесь!!!!!!*/
      console.error(err);
      setAuthResult(false);
      handleInfoTooltip();
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ password, email }) => {
    try {
      await Auth.register({ password, email });
      setAuthResult(true);
    } catch (err) { /*блок catch здесь!!!!!!!!*/
      console.error(err);
      setAuthResult(false);
      handleInfoTooltip();
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = useCallback(() => {
    setLoggedIn(false);
    setUserData({});
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
    setHeaderButtonText("Регистрация");
  }, [navigate]);

  const handleNavAuth = () => {
    if (headerButtonText === "Регистрация") {
      navigate("/sign-up", { replace: true });
      setHeaderButtonText("Войти");
    } else if (headerButtonText === "Войти") {
      setHeaderButtonText("Регистрация");
      navigate("/sign-in", { replace: true });
    }
  };

  return {
    checkToken,
    handleLogin,
    handleRegister,
    handleLogOut,
    handleNavAuth,
    loggedIn,
    loading,
    userData,
    headerButtonText,
    authResult,
    setLoading,
    setLoggedIn,
    setUserData,
    setAuthResult,
    setHeaderButtonText,
  };
};
