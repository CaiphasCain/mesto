import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupText = this._popup.querySelector('.popup__desc');
    }

    open(desc, img) {
        super.open();

        this._popupImage.setAttribute('src', img);
        this._popupImage.setAttribute('alt', desc);
        this._popupText.textContent = desc;
    }
}