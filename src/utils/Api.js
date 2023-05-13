class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus = () => (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  _makeRequest = (url, method, body) => {
    const config = {
      method,
      credentials: 'include',
      headers: this._headers,
    };
    if (body) {
      config.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${url}`, config).then(
      this._checkResponseStatus()
    );
  };

  getInfoMe = () => {
    return this._makeRequest('/users/me', 'GET');
  };

  getInitialCards = () => {
    return this._makeRequest('/cards', 'GET');
  };

  editUserProfile = (info) => {
    return this._makeRequest('/users/me', 'PATCH', {
      name: info.name,
      about: info.about,
    });
  };

  changeUserAvatar = (data) => {
    return this._makeRequest('/users/me/avatar', 'PATCH', {
      avatar: data.avatar,
    });
  };

  addNewCard = (data) => {
    return this._makeRequest('/cards', 'POST', {
      name: data.name,
      link: data.link,
    });
  };

  deleteCard = (id) => {
    return this._makeRequest(`/cards/${id}`, 'DELETE');
  };

  _likeSetting = (id) => {
    return this._makeRequest(`/cards/${id}/likes`, 'PUT');
  };

  _likeRemoving = (id) => {
    return this._makeRequest(`/cards/${id}/likes`, 'DELETE');
  };

  changeLikeCardStatus = (id, isLiked) => {
    return !isLiked ? this._likeSetting(id) : this._likeRemoving(id);
  };
}

const api = new Api({
  baseUrl: 'https://samoshin-project.nomoredomains.monster',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
