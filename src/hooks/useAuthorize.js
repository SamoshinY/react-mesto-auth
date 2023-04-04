import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

export const useAuthorize = (handleInfoTooltip) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authResult, setAuthResult] = useState(false);
  const [errorText, setErrorText] = useState("");

  const checkToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Нет токена");
      }
      const user = await Auth.getContent(token);
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
      setErrorText("");
      const data = await Auth.authorize(values);
      if (data.error || data.message) {
        setErrorText(data.error || data.message);
        setAuthResult(false);
        throw new Error("Ошибка аутентификации");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
      }
      navigate("/", { replace: true });
      setUserData(values);
    } catch (err) {
      console.error(err);
      setAuthResult(false);
      handleInfoTooltip();
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ password, email }) => {
    try {
      setErrorText("");
      const user = await Auth.register({ password, email });
      if (user.error || user.message) {
        setErrorText(user.error || user.message);
        setAuthResult(false);        
        throw new Error("Ошибка регистрации");
      }
      if (user.data._id) {
        setAuthResult(true);
        handleInfoTooltip();
      }
    } catch (err) {
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
  }, [navigate]); 

  return {
    checkToken,
    handleLogin,
    handleRegister,
    handleLogOut,
    loggedIn,
    loading,
    userData,
    authResult,
    errorText    
  };
};