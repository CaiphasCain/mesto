export default class Card {
  constructor(data, cardSelector, handlePhoto) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePhoto = handlePhoto;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
    return cardElement;
  }

  generateCard() {
    this._newElement = this._getTemplate();
    this._element = this._newElement.querySelector('.element');
    this._elementTitle = this._newElement.querySelector('.element__name');
    this._elementImage = this._newElement.querySelector('.element__photo');
    this._elementLike = this._newElement.querySelector('.element__like');
    this._deleteCard = this._newElement.querySelector('.element__delete');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    
    this._addListeners();
    return this._newElement;
  }

  _addListeners() {
    this._elementImage.addEventListener('click', () => this._handlePhoto() );
    this._elementLike.addEventListener('click', () => this._handleLike() );
    this._deleteCard.addEventListener('click', () => this._handleDelete() );
}
  
  _handleDelete(){
    this._newElement.remove();
  }
  
  _handleLike(){
    this._elementLike.classList.toggle('element__like_active');
  };
  
  
}

