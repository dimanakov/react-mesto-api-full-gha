class Api {
  constructor({baseUrl, headers}) {
    this._address = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json();
  }

  async getUserInfo() {
    const res = await fetch(`${this._address}/users/me`, {
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  async getInitialCards() {
    const res = await fetch(`${this._address}/cards`, {
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  async setUserInfo(data) {
    const res = await fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    });
    return this._getResponseData(res);
  }

  async addCard(data) {
    const res = await fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
    return this._getResponseData(res);
  }

  changeLikeCardStatus(card, isLiked){
    return isLiked ? this.addLike(card) : this.removeLike(card)
  }

  async addLike(data) {
    const res = await fetch(`${this._address}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  async removeLike(data) {
    const res = await fetch(`${this._address}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  async removeCard(data) {
    const res = await fetch(`${this._address}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this._getResponseData(res);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '5fe7123c-7279-49b2-81ff-c2ec486e8681',
    'Content-Type': 'application/json'
  },
});

export default api;