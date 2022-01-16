let profileEditButton = document.querySelector('.profile__edit-button');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__form-name')
let jobInput = document.querySelector('.popup__form-desc')
let profileName = document.querySelector('.prolile__name')
let profileDesc = document.querySelector('.profile__desc')

function EditButtonClick() {
  popup.classList.add('popup_opened')
};
profileEditButton.addEventListener('click', EditButtonClick);

function closeButtonClick() {
  popup.classList.remove('popup_opened')
};
popupCloseButton.addEventListener('click', closeButtonClick);

popupSubmitButton.addEventListener('click', closeButtonClick);




function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameValue = nameInput.getAttribute('value');
  let jobValue = jobInput.getAttribute('value');
  profileName.textContent = nameValue.valueOf;
  profileProfession.textContent = jobValue.valueOf;
}

formElement.addEventListener('submit', formSubmitHandler);





