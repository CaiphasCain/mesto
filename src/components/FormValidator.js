export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement  = this._form.querySelector(this._settings.submitButtonSelector);
  }
  
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };
  
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  };

  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid){
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled","")
  } else {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled","")
  } 
  };

  _setEventListeners ()  {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState ()
      });
    });
  }

  resetValidation ()  {
    this._toggleButtonState(); // управляем кнопкой

      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement) //очищаем ошибки
      });

  }

  enableValidation () {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      this._setEventListeners(); 
  };

}
