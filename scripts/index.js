const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popupEdit');
const popupAdd = document.querySelector('#popupAdd');
const popupSubmitButton = document.querySelector('.popup__submit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
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
const template = document.querySelector('#elementTemplate').content;
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

function toggleClass(popup, className){
  popup.classList.toggle(className)
}

function togglePopup(popup){
  toggleClass(popup, 'popup_opened')
}

function onEditButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  togglePopup(popupEdit)
  addKeydown()
};

function onAddButtonClick() {
  togglePopup(popupAdd)
  addKeydown()
};

// function onCloseButtonClick(event) {
//   togglePopup(event.target.closest('.popup'));
// };

function onPopupClick(event) {
  if (event.target.closest('.popup__close-button')) {togglePopup(event.target.closest('.popup'))};
  if (!event.target.closest('.popup__container')) {togglePopup(event.target.closest('.popup'))};
};



function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  togglePopup(popupEdit)
};

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  togglePopup(popupAdd)
  renderItem(placeInput.value, linkInput.value)
  placeInput.value = ''
  linkInput.value = ''
};

function render() {
  initialCards.forEach((val)=>{
    const name = val.name
    const link = val.link
    renderItem(name, link)});
}

function createCard(name, src){
  const cardElement = template.cloneNode(true);
  const elPhoto = cardElement.querySelector('.element__photo')
  elPhoto.setAttribute('src', src)
  elPhoto.setAttribute('alt', name)
  cardElement.querySelector('.element__name').textContent = name
  addListeners(cardElement)
  return cardElement
}

function renderItem(name, src){
  const newItem = createCard(name, src)
  element.prepend(newItem);
}

function addListeners(el){
  el.querySelector('.element__delete').addEventListener('click', handleDelete)
  el.querySelector('.element__like').addEventListener('click', handleLike)
  el.querySelector('.element__photo').addEventListener('click', handlePhoto)
}

function handleDelete(event){
  event.target.closest('.element').remove();
}

function handleLike(event){
  event.target.classList.toggle('element__like_active');
};

function handlePhoto(event){
  const alt = event.target.alt;
  description.textContent = alt;
  image.setAttribute('src', event.target.src);
  image.setAttribute('alt', alt);
  togglePopup(popupImg);
  addKeydown()
};

function handleKeydown(event){
  if (event.keyCode == 27) {
    togglePopup(document.querySelector('.popup_opened'));
    document.removeEventListener('keydown', handleKeydown);
}
};

function addKeydown () {
  document.addEventListener('keydown', handleKeydown)
}

profileEditButton.addEventListener('click', onEditButtonClick);
profileAddButton.addEventListener('click', onAddButtonClick);
// popupCloseButtons.forEach((el)=>{
//   el.addEventListener('click', onCloseButtonClick
//   )});
popups.forEach((el)=>{
  el.addEventListener('click', onPopupClick
  )});
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
render()