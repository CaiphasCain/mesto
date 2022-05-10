export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setInitialCards(arrayWithCards) {
    this._renderedItems = arrayWithCards;
}

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.reverse().forEach((item) => {
        this.addItem(this.renderer(item));
    });
}
}