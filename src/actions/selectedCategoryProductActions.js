import {
  FETCH_SELECTED_CATEGORY_PRODUCT_REQUEST,
  FETCH_SELECTED_CATEGORY_PRODUCT_SUCCESS,
  FETCH_SELECTED_CATEGORY_PRODUCT_FAILURE,
} from "../types";
import { getSelectedCategoryProduct } from "../services/api";
import { SUCCESS_STATUS_CODE_200, ERROR_MESSAGE } from "../constant";

export const fetchSelectedCategoryProductsDataRequest = () => ({
  type: FETCH_SELECTED_CATEGORY_PRODUCT_REQUEST,
});

export const fetchSelectedCategoryProductDataSuccess = (products) => ({
  type: FETCH_SELECTED_CATEGORY_PRODUCT_SUCCESS,
  data: products,
});

export const fetchSelectedCategoryProductsDataFailure = () => ({
  type: FETCH_SELECTED_CATEGORY_PRODUCT_FAILURE,
});

export const getSelectedCategoryProducts = ({ dispatch, category }) => {
  dispatch(fetchSelectedCategoryProductsDataRequest());
  getSelectedCategoryProduct({ category })
    .then((res) => {
      if (res.status === SUCCESS_STATUS_CODE_200) {
        const { data } = res;
        dispatch(fetchSelectedCategoryProductDataSuccess(data));
      } else {
        throw ERROR_MESSAGE;
      }
    })
    .catch((err) => dispatch(fetchSelectedCategoryProductsDataFailure()));
};
