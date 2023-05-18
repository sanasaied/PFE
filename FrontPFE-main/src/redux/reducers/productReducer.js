import { FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

const initState = {
  products: []
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_PRODUCTS_ERROR:

      return {
        ...state,
        products: []
      };
    default:
      break;
  }

  return state;
};

export default productReducer;
