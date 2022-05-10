export default class UserInfo {
  constructor({ userNameSelector, userAboutMeSelector, userAvatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector) ;
        this._userAboutMeElement = document.querySelector(userAboutMeSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

  getUserInfo() {
      const userData = {
          name: this._userNameElement.textContent,
          about: this._userAboutMeElement.textContent
      }
      return userData;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userNameElement.textContent = name;
    this._userAboutMeElement.textContent = about;
    this._userAvatarElement.src = avatar;
    this._myId = _id;
  }

  returnMyId() {
    return this._myId;
  }
}