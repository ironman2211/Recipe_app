import view from './view.js';
import icons from 'url:../../img/icons.svg';
class result extends view {
  _ParentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'sorry we couldnot found your recipe ;(';
  addhandlerRander(rander) {
    window.addEventListener('load', rander);
  }
  _createMArkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
     <li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
        
          </div>
        </a>
      </li> 

      `;
  }
  _createMArkup() {
    return this._data.map(this._createMArkupPreview).join('');
  }
}
export default new result();
