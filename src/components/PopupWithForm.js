import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, saveForm}) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._saveForm = saveForm;
        this._inputs = this._popup.querySelectorAll('.popup__form-input');
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    _setSubmitAction(event) {
        event.preventDefault();
        this._saveForm(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._setSubmitAction.bind(this));
    }

    _getInputValues() {
        const inputData = {};
        this._inputs.forEach(input => {
            inputData[input.name] = input.value;
        });
        return inputData;
    }
}