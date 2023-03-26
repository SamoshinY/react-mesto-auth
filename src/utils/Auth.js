export const BASE_URL = "https://auth.nomoreparties.co";

const makeRequest = (url, method, body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  };
  const config = {
    method,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  };
  return fetch(`${BASE_URL}${url}`, config)
    .then(checkResponse);    
};

export const register = ({ password, email }) => {
  return makeRequest("/signup", "POST", { password, email });
};

export const authorize = ({password, email}) => {
  return makeRequest("/signin", "POST", { password, email });
};

export const getContent = (token) => {
  return makeRequest("/users/me", "GET", undefined, token);
};

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
