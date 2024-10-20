import { combineReducers } from "redux";
import products from "./reducer/productReducer";
import category from "./reducer/categoryReducer";
import categoryProducts from "./reducer/selectedCategoryProductReducer";

export default combineReducers({
  categories: category,
  products: products,
  categoryProducts: categoryProducts,
});
