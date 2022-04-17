import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popupEdit');
const popupAdd = document.querySelector('#popupAdd');
const popups = document.querySelectorAll('.popup');
const formEdit = document.querySelector('#formEdit')
const formAdd = document.querySelector('#formAdd')
const nameInput = document.querySelector('#popup__form-name')
const jobInput = document.querySelector('#popup__form-desc')
const placeInput = document.querySelector('#popup__form-place')
const linkInput = document.querySelector('#popup__form-link')
const profileName = document.querySelector('.profile__name')
const profileDesc = document.querySelector('.profile__desc')
const element = document.querySelector('.elements')
const popupImg = document.querySelector('#popupImg')
const image = document.querySelector('.popup__image')
const description = document.querySelector('.popup__desc')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__form-input', 
  submitButtonSelector: `.popup__submit-button`, 
  inactiveButtonClass: `popup__submit-button_inactive`, 
  inputErrorClass: `popup__form-input_error`, 
  errorClass: `popup__input-error_visible` 
};
const editProfileValidator = new FormValidator(validationConfig, formEdit)
const addCardValidator = new FormValidator(validationConfig, formAdd)

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

 function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function handleEditButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  editProfileValidator.resetValidation();
  openPopup(popupEdit)
};

function handleAddButtonClick() {
  addCardValidator.resetValidation();
  openPopup(popupAdd)
  addCardValidator.enableValidation();
};

// function handlePopupClick(event) {
//   if (event.target.closest('.popup__close-button')) {closePopup(event.target.closest('.popup'))};
//   if (!event.target.closest('.popup__container')) {closePopup(event.target.closest('.popup'))};
// };

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEdit)
};

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  closePopup(popupAdd)
  const temp = {}
  temp.name = placeInput.value
  temp.link = linkInput.value
  render(temp)
  formAdd.reset()
};
///////////////////////////////////////////////////////////
function handlePhoto(desc, img){
  description.textContent = desc;
  image.setAttribute('src', img);
  image.setAttribute('alt', desc);
  openPopup(popupImg);
};

function createCard(item) {
  const card = new Card(item, '#elementTemplate', handlePhoto);
  const cardElement = card.generateCard();
  return cardElement
}

function renderInitial(){
  initialCards.forEach((item) => {  
    const cardElement = createCard(item)
    element.prepend(cardElement);
   });
}

function render(item){
  const cardElement = createCard(item)
  element.prepend(cardElement);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);
// popupCloseButtons.forEach((el)=>{
//   el.addEventListener('click', onCloseButtonClick
//   )});
// popups.forEach((el)=>{
//   el.addEventListener('click', handlePopupClick
//   )});
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
renderInitial()