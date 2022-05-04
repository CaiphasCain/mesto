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
const profileValidator = new FormValidator(validationConfig, formEdit)
const cardValidator = new FormValidator(validationConfig, formAdd)

profileValidator.enableValidation();
cardValidator.enableValidation();

const userInf = new UserInfo({userNameSelector:'.profile__name', userAboutMeSelector: '.profile__desc'})

function handleEditButtonClick() {
  const userData = (userInf.getUserInfo())
  nameInput.value = userData.name
  jobInput.value = userData.about
  profileValidator.resetValidation();
  popupEdit.open()
};

function handleAddButtonClick() {
  cardValidator.resetValidation();
  popupAdd.open()
};

const photoPopup = new PopupWithImage('#popupImg')
photoPopup.setEventListeners();

function handlePhoto(desc, img){
  photoPopup.open(desc, img);
};
/////////////////////////////////////////////////////////////////
function createCard(item) {
  const card = new Card(item, '#elementTemplate', handlePhoto);
  const cardElement = card.generateCard();
  return cardElement
}

const renderCard = (item) => {
  const cardElement = createCard(item)
  cardsList.addItem(cardElement);
}

const cardsList = new Section({
  data: initialCards,
  renderer: renderCard
},
cardListSection
)
cardsList.renderItems(); 

const popupAdd = new PopupWithForm({
  popupSelector:'#popupAdd',
  saveForm: (inputValues) => {
    const temp = {}
    temp.name = inputValues.popup__form_place
    temp.link = inputValues.popup__form_link
    popupAdd.close();
    renderCard(temp)
    }
  }
);

const popupEdit = new PopupWithForm({
  popupSelector: '#popupEdit',
  saveForm: (inputValues) => {
    userInf.setUserInfo(inputValues.popup__form_name, inputValues.popup__form_desc) 
    popupEdit.close()
    }
  }
);

profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);
popupEdit.setEventListeners()
popupAdd.setEventListeners()

const ava = new URL('../images/ava.jpg', import.meta.url);
const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'ava', image: ava },
]; 
import './index.css';