export const BASE_URL = 'https://samoshin-project.nomoredomains.monster';

const makeRequest = (url, method, body) => {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method,
    headers,
    credentials: 'include',
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) => res.json());
};

export const register = ({ password, email }) => {
  return makeRequest('/signup', 'POST', { password, email });
};

export const authorize = ({ password, email }) => {
  return makeRequest('/signin', 'POST', { password, email });
};

export const getContent = () => {
  return makeRequest('/users/me', 'GET');
};

export const logout = () => {
  return makeRequest('/users/me', 'DELETE');
};
