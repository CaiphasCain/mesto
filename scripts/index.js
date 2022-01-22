let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('#popup__form-name')
let jobInput = document.querySelector('#popup__form-desc')
let profileName = document.querySelector('.profile__name')
let profileDesc = document.querySelector('.profile__desc')
// let element = document.querySelector('.elements')
// let likeButtons = element.querySelectorAll('.element__like')

function onEditButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  popup.classList.add('popup_opened')
};

function onCloseButtonClick() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
};

// for (let i = 0; i < likeButtons.length; i++){
//   likeButtons[i].addEventListener('click', likeActive)
// }

// function likeActive(){
//   this.classList.toggle('element__like_active');
// };

profileEditButton.addEventListener('click', onEditButtonClick);
popupCloseButton.addEventListener('click', onCloseButtonClick);
formElement.addEventListener('submit', formSubmitHandler);