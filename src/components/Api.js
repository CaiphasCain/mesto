export default class Api {
  constructor({ serverAddress, token, cohort }) {
      this._serverAddress = serverAddress;
      this._token = token;
      this._cohort = cohort;
      this._baseUrl = `${this._serverAddress}/v1/${this._cohort}`;
  }

  _processResponseData(res) {
      if (res.ok) {
          return res.json();
      }

      return Promise.reject(`Что-то пошло не так, ошибка: ${res.status}`);
  }

  getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
              authorization: this._token
          }
      })
          .then(this._processResponseData);
  }

  saveUserData(objectWithUserData) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: {
              authorization: this._token,
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              name: objectWithUserData.popup__form_name,
              about: objectWithUserData.popup__form_desc
          })
      })
          .then(this._processResponseData);
  }

  saveUserAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
              authorization: this._token,
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              avatar: avatarUrl
          })
      })
          .then(this._processResponseData);
  }

  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          method: 'GET',
          headers: {
              authorization: this._token
          }
      })
          .then(this._processResponseData);
  }

  saveNewCard(objectWithCardData) {
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: {
              authorization: this._token,
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              name: objectWithCardData.popup__form_place,
              link: objectWithCardData.popup__form_link
          })
      })
          .then(this._processResponseData);
  }

  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
              authorization: this._token
          }
      })
          .then(this._processResponseData);
  }

  addLikeOfCard(cardId, user) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
              authorization: this._token,
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              likes: user
          })
      })
          .then(this._processResponseData);
  }

  removeLikeOfCard(cardId, user) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
              authorization: this._token,
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              likes: user
          })
      })
          .then(this._processResponseData);
  }
}