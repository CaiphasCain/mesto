import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor({popupSelector, saveForm}) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._saveForm = saveForm;
    }

    open(cardId, card) {
        super.open();
        this._cardId = cardId;
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._setSubmitDeleteCard.bind(this));
    }
    _setSubmitDeleteCard(event) {
        event.preventDefault();
        this._saveForm(this._cardId, this._card);
    }
}