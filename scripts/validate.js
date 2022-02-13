const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__form-input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-input_error');
  errorElement.classList.remove('popup__input-error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid){
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};

const toggleButtonState  = (inputList,buttonElement) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__submit-button_inactive');
} else {
  buttonElement.classList.remove('popup__submit-button_inactive');
} 
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement  = formElement.querySelector('.popup__submit-button');
  toggleButtonState (inputList,buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState (inputList,buttonElement)
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
  formList.forEach((formElement) => {
    setEventListeners(formElement);
}); 
};
enableValidation();
