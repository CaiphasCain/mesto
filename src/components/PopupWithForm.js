import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, saveForm}) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._saveForm = saveForm;
        this._inputs = this._popup.querySelectorAll('.popup__form-input');
        this._submitBtn = this._popup.querySelector('.popup__submit-button');
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', () => this._saveForm(this._getInputValues())); 
    }

    _getInputValues() {
        const inputData = {};
        this._inputs.forEach(input => {
            inputData[input.name] = input.value;
        });
        return inputData;
    }

    renderLoading(isLoading, btnText, btnTextInProcess) {
        isLoading
            ? this._submitBtn.textContent = btnTextInProcess
            : this._submitBtn.textContent = btnText;
    }
}