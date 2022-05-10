export default class Card {
  constructor({data, cardSelector, handlePhoto, handleDelete, handleLike, myData, myId}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handlePhoto = handlePhoto;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._myData = myData,
    this._myId = myId
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    if (this._userId === this._myId) {
      cardElement.insertAdjacentHTML(
          'beforeend',
          '<button class="element__delete button" type="button" aria-label="удалить"></button>'
        );
    }

    return cardElement;
  }

  generateCard() {
    this._newElement = this._getTemplate();
    this._elementTitle = this._newElement.querySelector('.element__name');
    this._elementImage = this._newElement.querySelector('.element__photo');
    this._elementLike = this._newElement.querySelector('.element__like');
    this._deleteElement = this._newElement.querySelector('.element__delete');
    this._likeCount = this._newElement.querySelector('.element__like_count');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this.countLikes(this._likes)
    if (!this.isLikedCard()){this.toggleLike}
    this._addListeners();
    return this._newElement;
  }

  _addListeners() {
    this._elementImage.addEventListener('click', () => this._handlePhoto(this._name, this._link) );
    this._elementLike.addEventListener('click', () => {
      this._handleLike(this._cardId, this._myData);
  });
    if (this._deleteElement) {
      this._deleteElement.addEventListener('click', () => {
          this._handleDelete(this._cardId, this);
      });
  }
}
  
  countLikes(likes) {
    return this._likeCount.textContent = likes.length;
  }

  changeLikesArray(likesArray) {
    return this._likes = likesArray;
  }

  isLikedCard() {
    return this._likes.some(item => item._id === this._myId);
  }
  
  deleteCard(){
    this._newElement.remove();
    this._newElement = null
  }
  
  toggleLike(){
    this._elementLike.classList.toggle('element__like_active');
  };
  
}

