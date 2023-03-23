class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus = () => (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getInfoMe = () =>
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponseStatus());

  editUserProfile = (info) =>
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then(this._checkResponseStatus());

  getInitialCards = () =>
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponseStatus());

  addNewCard = (data) =>
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponseStatus());

  deleteCard = (id) =>
    fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponseStatus());

  _likeSetting = (id) =>
    fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._checkResponseStatus());

  _likeRemoving = (id) =>
    fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponseStatus());

  changeLikeCardStatus = (id, isLiked) => {
    return !isLiked ? this._likeSetting(id) : this._likeRemoving(id);
  };

  changeUserAvatar = (data) =>
    fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponseStatus());
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "d322a368-4724-446c-8427-74524503d98e",
    "Content-Type": "application/json",
  },
});

export default api;
