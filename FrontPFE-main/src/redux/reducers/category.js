import { GET_ALL_CATEGORIES, SET_SELECTED_CATEGORY } from "../actions/category";

const initState = {
  category: [],
  selectedCategory: ""

};

const categoryReducer = (state = initState, action) => {
  if (action.type === GET_ALL_CATEGORIES) {
    return {
      ...state,
      category: action.payload
    };
  }
  if (action.type === SET_SELECTED_CATEGORY) {
    return {
      ...state,
      selectedCategory: action.payload
    };
  }
  return state;
};

export default categoryReducer;
