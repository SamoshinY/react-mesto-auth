import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Auth from '../utils/Auth';

export const useAuthorize = (handleInfoTooltip) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authResult, setAuthResult] = useState(false);
  const [errorText, setErrorText] = useState('');

  const checkToken = useCallback(async () => {
    try {
      const user = await Auth.getContent();

      if (!user._id) {
        throw new Error('Нет данных');
      }
      setLoggedIn(true);
      navigate('/', { replace: true });
      setUserData(user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    try {
      setErrorText('');
      const data = await Auth.authorize(values);

      if (data.error || data.message !== 'Вы успешно прошли авторизацию!') {
        setErrorText(data.error || data.message);
        setAuthResult(false);
        throw new Error('Ошибка аутентификации');
      }
      setLoggedIn(true);
      navigate('/', { replace: true });
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
      setErrorText('');
      const user = await Auth.register({ password, email });

      if (user.error || user.message) {
        setErrorText(user.error || user.message);
        setAuthResult(false);
        throw new Error('Ошибка регистрации');
      }
      if (user._id) {
        setAuthResult(true);
        handleInfoTooltip();
        navigate('/sign-in', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setAuthResult(false);
      handleInfoTooltip();
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await Auth.logout();
      setLoggedIn(false);
      setUserData({});      
      navigate('/sign-in', { replace: true });      
    } catch (err) {
      console.error(err);
    }
  };

  return {
    checkToken,
    handleLogin,
    handleRegister,
    handleLogOut,
    loggedIn,
    loading,
    userData,
    authResult,
    errorText,
  };
};
