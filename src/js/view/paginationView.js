import view from './view.js';
import icons from 'url:../../img/icons.svg';
class paginationView extends view {
  _ParentElement = document.querySelector('.pagination');
  Randerpage(handler) {
    this._ParentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const page = +btn.dataset.goto;
      console.log(page + 'check 1');
      handler(page);
    });
  }

  _createMArkup() {
    const currentpage = this._data.page;
    const noOfPage = Math.ceil(
      this._data.result.length / this._data.Resultsperpage
    );
    console.log(noOfPage);
    //we are in 1st page
    if (currentpage == 1 && noOfPage > 1) {
      return `   
        <button data-goto='${
          currentpage + 1
        }' class="btn--inline pagination__btn--next">
       <span>Page ${currentpage + 1}</span>
         <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </button>
      `;
    }

    //we are in the last page
    if (currentpage == noOfPage && noOfPage > 1) {
      return `
      <button data-goto='${
        currentpage - 1
      }' class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
       </svg>
        <span>Page ${currentpage - 1}</span>
     </button>
      `;
    }
    //we are in othe page
    if (currentpage < noOfPage) {
      return `
      
      <button data-goto='${
        currentpage - 1
      }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
            </svg>
        <span>Page ${currentpage - 1}</span>
        </button>

      <button data-goto='${
        currentpage + 1
      }' class="btn--inline pagination__btn--next">
      <span>Page ${currentpage + 1}</span>
       <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
       </button>

      `;
    }
    //their is no page rather than one page
    return '';
  }
}
export default new paginationView();
