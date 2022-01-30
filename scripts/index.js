const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popupEdit');
const popupAdd = document.querySelector('#popupAdd');
const popupSubmitButton = document.querySelector('.popup__submit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const formEdit = document.querySelector('#formEdit')
const formAdd = document.querySelector('#formAdd')
const nameInput = document.querySelector('#popup__form-name')
const jobInput = document.querySelector('#popup__form-desc')
const placeInput = document.querySelector('#popup__form-place')
const linkInput = document.querySelector('#popup__form-link')
const profileName = document.querySelector('.profile__name')
const profileDesc = document.querySelector('.profile__desc')
const element = document.querySelector('.elements')
const likeButtons = element.querySelectorAll('.element__like')
const template = document.querySelector('#elementTemplate').content;
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
};

function onAddButtonClick() {
  togglePopup(popupAdd)
};

function onCloseButtonClick(event) {
  event.target.closest('.popup').classList.toggle('popup_opened');
};

function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  togglePopup(popupEdit)
};

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  togglePopup(popupAdd)
  renderItem(placeInput.value, linkInput.value)
};

function render() {
  initialCards.forEach((val)=>{
    const name = val.name
    const link = val.link
    renderItem(name, link)});
}

function renderItem(name, src){
  const newItem = template.cloneNode(true);
  let place = name
  let link = src
  newItem.querySelector('.element__photo').setAttribute('src', link)
  newItem.querySelector('.element__photo').setAttribute('alt', place)
  newItem.querySelector('.element__name').innerText = place
  addListeners(newItem)
  element.appendChild(newItem);
  placeInput.value = ''
  linkInput.value = ''
}

function addListeners(el){
  el.querySelector('.element__delete').addEventListener('click', handleDelete)
  el.querySelector('.element__like').addEventListener('click', handleLike)
}

function handleDelete(event){
  event.target.closest('.element').remove();
}

function handleLike(){
  this.classList.toggle('element__like_active');
};

profileEditButton.addEventListener('click', onEditButtonClick);
profileAddButton.addEventListener('click', onAddButtonClick);
popupCloseButtons.forEach((el)=>{
  el.addEventListener('click', onCloseButtonClick
  )});
formEdit.addEventListener('submit', editFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);
render()