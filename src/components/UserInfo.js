export default class UserInfo {
  constructor( userNameSelector, userAboutMeSelector ) {
      this._userNameElement = document.querySelector(userNameSelector) ;
      this._userAboutMeElement = document.querySelector(userAboutMeSelector);
  }

  getUserInfo() {
      this._userData = {
          name: this._userNameElement.textContent,
          about: this._userAboutMeElement.textContent
      }
      return this._userData;
  }

  setUserInfo( name, about ) {
      this._userNameElement.textContent = name;
      this._userAboutMeElement.textContent = about;
  }
}