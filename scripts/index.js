let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__form-name')
let jobInput = document.querySelector('.popup__form-desc')
let profileName = document.querySelector('.profile__name')
let profileDesc = document.querySelector('.profile__desc')
let elements = document.querySelector('.elements')
let likeButtons = elements.querySelectorAll('.element__like')

function editButtonClick() {
  popup.classList.add('popup_opened')
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
};
profileEditButton.addEventListener('click', editButtonClick);

function closeButtonClick() {
  popup.classList.remove('popup_opened');
};
popupCloseButton.addEventListener('click', closeButtonClick);

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileDesc.textContent = jobValue;
  popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', formSubmitHandler);

for (let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener('click', likeActive)
}

function likeActive(){
  this.classList.toggle('element__like_active');
};