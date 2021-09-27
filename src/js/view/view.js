import icons from 'url:../../img/icons.svg';
export default class view {
  _data;
  /**
   * render the recived object from DOM
   * @author brahmathe great:)jonas schemedthmen sir jii
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length == 0)) {
      return this.RenderError();
    }
    this._data = data;
    const html = this._createMArkup();
    this._clear();
    this._ParentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._createMArkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._ParentElement.querySelectorAll('*'));

    newElement.forEach((newEL, i) => {
      const curEL = curElement[i];
      if (
        !newEL.isEqualNode(curEL) &&
        newEL.firstChild?.nodeValue.trim() !== ''
      ) {
        curEL.textContent = newEL.textContent;
      }
      //update the vallue of data-updte
      if (!newEL.isEqualNode(curEL)) {
        Array.from(newEL.attributes).forEach(attr =>
          curEL.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  RenderLoad() {
    const html = `
         <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
         </div>
        `;
    this._clear();
    this._ParentElement.insertAdjacentHTML('afterbegin', html);
  }
  RenderError(err = this._errorMessage) {
    const html = ` <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${err}</p>
    </div>`;
    this._clear();
    console.log('beep beep');
    this._ParentElement.insertAdjacentHTML('afterbegin', html);
  }
  RenderMessage(message = this._Message) {
    const html = ` <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._ParentElement.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._ParentElement.innerHTML = ' ';
  }
}
