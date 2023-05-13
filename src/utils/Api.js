class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus = () => (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  // _makeRequest = (url, method, body, token) => {
    
  //   const config = {
  //     method,
  //     credentials: 'include',
  //     headers: this._headers,
  //   };
  //   if (body) {
  //     config.body = JSON.stringify(body);
  //   }
  //   return fetch(`${this._baseUrl}${url}`, config).then(
  //     this._checkResponseStatus()
  //   );
  // };

  getInfoMe = () =>
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',      
    }).then(this._checkResponseStatus());

  editUserProfile = (info) =>
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then(this._checkResponseStatus());

  getInitialCards = () =>
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponseStatus());

  addNewCard = (data) =>
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponseStatus());

  deleteCard = (id) =>
    fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      credentials: 'include',
      method: 'DELETE',
    }).then(this._checkResponseStatus());

  _likeSetting = (id) =>
    fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      credentials: 'include',
      method: 'PUT',
    }).then(this._checkResponseStatus());

  _likeRemoving = (id) =>
    fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      credentials: 'include',
      method: 'DELETE',
    }).then(this._checkResponseStatus());

  changeLikeCardStatus = (id, isLiked) => {
    return !isLiked ? this._likeSetting(id) : this._likeRemoving(id);
  };

  changeUserAvatar = (data) =>
    fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponseStatus());
}

const api = new Api({
  baseUrl: 'https://samoshin-project.nomoredomains.monster',
  headers: {'Content-Type': 'application/json'},
  // credentials: 'include',
});

export default api;
