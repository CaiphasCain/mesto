import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, saveForm) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._saveForm = saveForm;
        this._inputs = this._popup.querySelectorAll('.popup__form-input');
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._saveForm);
    }

    _getInputValues() {
        this._inputData = {};
        this._inputs.forEach(input => {
            this._inputData[input.name] = input.value;
        });
        return this._inputData;
    }
}