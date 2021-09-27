import view from './view.js';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class addRecipe extends view {
  _ParentElement = document.querySelector('.upload');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  constructor() {
    super();
    this.addHandlerToggle();
  }
  toggleWindowandOverlay() {
    this._overlay.classList.toggle('hidden');

    this._window.classList.toggle('hidden');
  }

  addHandlerToggle() {
    this._btnOpen.addEventListener(
      'click',
      this.toggleWindowandOverlay.bind(this)
    );
    this._btnClose.addEventListener(
      'click',
      this.toggleWindowandOverlay.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      this.toggleWindowandOverlay.bind(this)
    );
  }
  addUplodeRecipe(handler) {
    this._ParentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }
}
export default new addRecipe();
