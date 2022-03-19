export class Card {
  constructor(text, image) {
      this._text = text;
      this._image = image;
  }
  
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
      const cardElement = document
      .querySelector('.card-template')
      .content
      .querySelector('.card')
      .cloneNode(true);
      
    // вернём DOM-элемент карточки
      return cardElement;
  } 
}

const card = new Card('Привет! Как дела?', 'userpic.jpg');  