import * as model from './model.js';
import recipeview from './view/recipeview.js';
import searchview from './view/searchview.js';
import contentview from './view/contentsview';
import bookmarkview from './view/bookmarkview';
import addRecipeView from './view/addRecipeView';
import paginationview from './view/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const ShowRecipe = async function () {
  //01:loading of data

  try {
    //rander recpe
    const id = window.location.hash.slice(1);
    recipeview.RenderLoad();
    bookmarkview.render(model.state.bookmark);

    //01 render active class
    contentview.update(model.loadsearchPAge());

    //02:rendering of form
    await model.RenderRecipe(id);
    const { recipe } = model.state;

    recipeview.render(model.state.recipe);
  } catch (err) {
    recipeview.RenderError(err);
  }
};

const loadsearchresult = async function () {
  try {
    contentview.RenderLoad();

    const query = searchview.searchRES();
    if (!query) return;
    await model.loadsearch(query);
    console.log(model.state.search.result);
    console.log(model.loadsearchPAge(1));
    // contentview.render(model.state.search.result);
    console.log(model.state.search);

    contentview.render(model.loadsearchPAge());
    paginationview.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlChangeIngridents = function (newServings) {
  model.ChangeIngridients(newServings);

  // recipeview.render(model.state.recipe);
  recipeview.update(model.state.recipe);
};
const bookmarkresults = function () {
  if (!model.state.recipe.bookmarked) model.addbookmark(model.state.recipe);
  else model.removebookmark(model.state.recipe.id);

  console.log(model.state.recipe);
  recipeview.update(model.state.recipe);
};
const gotopage = function (gotopage) {
  contentview.render(model.loadsearchPAge(gotopage));
  paginationview.render(model.state.search);
};
const controlbookmark = function () {
  bookmarkview.render(model.state.bookmark);
};
const controlUplod = async function (data) {
  try {
    await model.addRecipe(data);
  } catch (err) {
    addRecipeView.RenderError(err.message);
  }
};
const test = function () {
  recipeview.RanderHandler(ShowRecipe);
  bookmarkview.addhandlerRander(controlbookmark);
  recipeview.RenderIngridients(controlChangeIngridents);
  recipeview.RenderBookmark(bookmarkresults);
  searchview.RanderSearch(loadsearchresult);
  paginationview.Randerpage(gotopage);
  addRecipeView.addUplodeRecipe(controlUplod);
};
test();
