import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAva = document.querySelector('.profile__avatar');
const formEdit = document.querySelector('#formEdit')
const formAdd = document.querySelector('#formAdd')
const formEditAvatar = document.querySelector('#formEditAvatar')
const nameInput = document.querySelector('#popup__form-name')
const jobInput = document.querySelector('#popup__form-desc')
const cardListSection = '.elements'
let myId, myData
const validationConfig = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__form-input', 
  submitButtonSelector: `.popup__submit-button`, 
  inactiveButtonClass: `popup__submit-button_inactive`, 
  inputErrorClass: `popup__form-input_error`, 
  errorClass: `popup__input-error_visible` 
};

//классы
const profileValidator = new FormValidator(validationConfig, formEdit)
const cardValidator = new FormValidator(validationConfig, formAdd)
const avaValidator = new FormValidator(validationConfig, formEditAvatar)

const api = new Api({
  serverAddress: 'https://mesto.nomoreparties.co',
  token: '3bacb34a-f873-4db8-915b-4fcc34790a04',
  cohort: 'cohort-40'
});

const userInf = new UserInfo({userNameSelector:'.profile__name', userAboutMeSelector: '.profile__desc', userAvatarSelector: '.profile__avatar'})

const photoPopup = new PopupWithImage('#popupImg')

const cardsList = new Section({
  data: [],
  renderer: (obj) => {
    return createCard(obj);
}
},
cardListSection
)

const popupAdd = new PopupWithForm({
  popupSelector:'#popupAdd',
  saveForm: (inputValues) => {
    popupAdd.renderLoading(true, 'Сохранить', 'Сохранение...');

    api.saveNewCard(inputValues)
        .then(res => {
          renderCard(res);
          popupAdd.close();
        })
        .catch(err => {
          console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
          popupAdd.renderLoading(false, 'Сохранить', 'Сохранение...');
        })
  }
  }
);

const popupEdit = new PopupWithForm({
  popupSelector: '#popupEdit',
  saveForm: (inputValues) => {
    popupEdit.renderLoading(true, 'Сохранить', 'Сохранение...');
    api.saveUserData(inputValues)
        .then(res => {
          controlUserData(res);
          popupEdit.close();
        })
        .catch(err => {
          console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
          popupEdit.renderLoading(false, 'Сохранить', 'Сохранение...');
        })
}
  }
);

const popupDelete = new PopupWithConfirm({
  popupSelector: '#popupDelete',
  saveForm: (cardId, card) => {
    api.deleteCard(cardId)
        .then(() => {
            card.deleteCard();
            popupDelete.close();
        })
        .catch(err => {
            console.error(`Ошибка: ${err}`);
        })
}
  }
);

const popupEditAvatar = new PopupWithForm({
  popupSelector: '#popupEditAvatar',
  saveForm: (inputValues) => {
      popupEditAvatar.renderLoading(true, 'Сохранить', 'Сохранение...');

      api.saveUserAvatar(inputValues.avatar)
          .then(res => {
              controlUserData(res);
              popupEditAvatar.close();
          })
          .catch(err => {
              console.error(`Ошибка: ${err}`);
          })
          .finally(() => {
              popupEditAvatar.renderLoading(false, 'Сохранить', 'Сохранение...');
          });
  }
});
//что-то делаем с классами
profileValidator.enableValidation();
cardValidator.enableValidation();
avaValidator.enableValidation();
photoPopup.setEventListeners();

//данные с сервера

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
        controlUserData(userData);
        myId = userInf.returnMyId()
        myData = userData;
        cardsList.setInitialCards(cards);
        cardsList.renderItems();
    })
    .catch(err => {
        console.error(`Ошибка: ${err}`);
    });



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

function handleAvatarClick() {
  avaValidator.resetValidation();
  popupEditAvatar.open()
};

function handlePhoto(desc, img){
  photoPopup.open(desc, img);
};

function handleDelete (cardId, card){
  popupDelete.open(cardId, card);
  
}
popupDelete.setEventListeners()
/////////////////////////////////////////////////////////////////
function createCard(item) {
  const card = new Card({data: item,
    cardSelector: '#elementTemplate',
    handlePhoto: handlePhoto,
    handleDelete: handleDelete,
    handleLike: (cardId, user) => {
                if (!card.isLikedCard()) {
                    selectRequest({
                        apiRequest: api.addLikeOfCard(cardId, user),
                        instanceCard: card
                    });
                } else {
                    selectRequest({
                        apiRequest: api.removeLikeOfCard(cardId, user),
                        instanceCard: card
                    });
                }
            }
        ,
    myData: myData,
    myId: myId});
  const cardElement = card.generateCard();
  return cardElement
}

function selectRequest({
  apiRequest: apiRequest,
  instanceCard: instanceCard
}) {
      return apiRequest
          .then(res => {
              return res.likes;
          })
          .then(data => {
              instanceCard.changeLikesArray(data);
              instanceCard.countLikes(data);
              instanceCard.toggleLike();
          })
          .catch(err => {
              console.error(`Ошибка: ${err}`);
          });
}

const renderCard = (item) => {
  const cardElement = createCard(item)
  cardsList.addItem(cardElement);
}

function controlUserData(data) {
  userInf.setUserInfo(data);
}

profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);
profileAva.addEventListener('click', handleAvatarClick);
popupEdit.setEventListeners()
popupAdd.setEventListeners()
popupEditAvatar.setEventListeners()

const ava = new URL('../images/ava.jpg', import.meta.url);
const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'ava', image: ava },
]; 
import './index.css';