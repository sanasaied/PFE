import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./category";
import compareReducer from "./compareReducer";
import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import wishlistReducer from "./wishlistReducer";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  category: categoryReducer,
  compareData: compareReducer,
  auth: authReducer
});

export default rootReducer;
