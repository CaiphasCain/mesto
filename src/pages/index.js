import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('#formEdit')
const formAdd = document.querySelector('#formAdd')
const nameInput = document.querySelector('#popup__form-name')
const jobInput = document.querySelector('#popup__form-desc')
const placeInput = document.querySelector('#popup__form-place')
const linkInput = document.querySelector('#popup__form-link')
const profileName = document.querySelector('.profile__name')
const profileDesc = document.querySelector('.profile__desc')
const cardListSection = '.elements'

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

function handleEditButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  editProfileValidator.resetValidation();
  popupEdit.open()
};

function handleAddButtonClick() {
  formAdd.reset()
  addCardValidator.resetValidation();
  popupAdd.open()
};

function handlePhoto(desc, img){
  const photoPopup = new PopupWithImage('#popupImg')
  photoPopup.open(desc, img);
  photoPopup.setEventListeners();
};
/////////////////////////////////////////////////////////////////
function createCard(item) {
  const card = new Card(item, '#elementTemplate', handlePhoto);
  const cardElement = card.generateCard();
  return cardElement
}

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item)
    cardsList.addItem(cardElement);
  }
},
cardListSection
)
cardsList.renderItems(); 

const popupAdd = new PopupWithForm(
  '#popupAdd',
  (event) => {
    event.preventDefault();
    const temp = {}
    temp.name = placeInput.value
    temp.link = linkInput.value
    popupAdd.close();
    cardsList.renderer(temp)
    popupAdd._popupForm.reset()
  }
);

const userInf = new UserInfo('.profile__name', '.profile__desc')
const popupEdit = new PopupWithForm(
  '#popupEdit',
  (event) => {
    event.preventDefault();
    userInf.setUserInfo(nameInput.value, jobInput.value)
    popupEdit.close()
    
  }
);

profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);
popupEdit.setEventListeners()
popupAdd.setEventListeners()

import './index.css';