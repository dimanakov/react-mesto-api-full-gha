class Api {
  constructor({ baseUrl, headers }) {
    this._address = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка в промисе запроса: ${res.status}`)
    }
    return res.json();
  }

  async getUserInfo() {
    const res = await fetch(`${this._address}/users/me`, {
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return this._getResponseData(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._address}/cards`, {
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return this._getResponseData(res);
  }

  async setUserInfo(data) {
    const res = await fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
    return this._getResponseData(res);
  }

  async setUserAvatar(link) {
    const res = await fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: link.avatar
      })
    });
    return this._getResponseData(res);
  }

  async addCard(data) {
    const res = await fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
    return this._getResponseData(res);
  }

  changeLikeCardStatus(card, isLiked) {
    return isLiked ? this.addLike(card) : this.removeLike(card)
  }

  async addLike(card) {
    const res = await fetch(`${this._address}/cards/${card._id}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return this._getResponseData(res);
  }

  async removeLike(card) {
    const res = await fetch(`${this._address}/cards/${card._id}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return this._getResponseData(res);
  }

  async removeCard(card) {
    const res = await fetch(`${this._address}/cards/${card._id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers, 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    return this._getResponseData(res);
  }
}

const api = new Api({
  baseUrl: 'https://api.get-mesto.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default api;