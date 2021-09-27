import { async } from 'regenerator-runtime';
import { api_url, PerPAge } from './config.js';
import { getjson, sendjson } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    Resultsperpage: PerPAge,
  },
  bookmark: [],
};

export const RenderRecipe = async function (id) {
  try {
    const data = await getjson(`${api_url}${id}`);
    let { recipe } = data.data;

    ///////////////////////
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingtime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      sourceurl: recipe.source_url,
    };
    if (state.bookmark.some(bm => bm.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadsearch = async function (query) {
  try {
    state.search.query = query;
    const data = await getjson(`${api_url}?search=${query}`);
    console.log(data);
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const loadsearchPAge = function (page = this.state.search.page) {
  this.state.search.page = page;
  const start = (page - 1) * state.search.Resultsperpage;
  const end = page * state.search.Resultsperpage;

  return state.search.result.slice(start, end);
};

export const ChangeIngridients = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const perssistance = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const addbookmark = function (recipe) {
  state.bookmark.push(recipe);

  if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;
  perssistance();
};
export const removebookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);
  if (id == state.recipe.id) state.recipe.bookmarked = false;
  perssistance();
};
export const addRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingARR = ing[1].replaceAll(' ', '').split(',');
        if (ingARR.length !== 3)
          throw new Error('please  enter a vlide reipe,try again :)');
        const [quantity, unit, description] = ingARR;
        return {
          quantity: quantity !== '' ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.source_url,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await sendjson(`${api_url}`, recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};
init();
