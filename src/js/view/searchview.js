class searchview {
  _parentEl = document.querySelector('.search');
  searchRES() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearSearch();
    return query;
  }
  _clearSearch() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  RanderSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchview();
