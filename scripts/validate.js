const showInputError = (formElement, inputElement, errorMessage,settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement,settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement,settings) => {
  if (inputElement.validity.valid){
    hideInputError(formElement, inputElement,settings);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage,settings);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};

const toggleButtonState  = (inputList,buttonElement,settings) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled","")
} else {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled","")
} 
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement  = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState (inputList,buttonElement,settings)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement,settings);
      toggleButtonState (inputList,buttonElement,settings)
    });
  });
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
  formList.forEach((formElement) => {
    setEventListeners(formElement,settings);
}); 
};
enableValidation({
  formSelector: '.popup__form', 
  inputSelector: '.popup__form-input', 
  submitButtonSelector: `.popup__submit-button`, 
  inactiveButtonClass: `popup__submit-button_inactive`, 
  inputErrorClass: `popup__form-input_error`, 
  errorClass: `popup__input-error_visible` 
});
