import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from "../types";
import { getCategoryServices } from "../services/api";
import { SUCCESS_STATUS_CODE_200, ERROR_MESSAGE } from "../constant";

export const fetchCategoryDataRequest = () => ({
  type: FETCH_CATEGORY_REQUEST,
});

export const fetchCategoryDataSuccess = (category) => ({
  type: FETCH_CATEGORY_SUCCESS,
  data: category,
});

export const fetchCategoryDataFailure = () => ({
  type: FETCH_CATEGORY_FAILURE,
});

export const getCategories = ({ dispatch }) => {
  dispatch(fetchCategoryDataRequest());
  getCategoryServices()
    .then((res) => {
      if (res.status === SUCCESS_STATUS_CODE_200) {
        const { data } = res;
        dispatch(fetchCategoryDataSuccess(data));
      } else {
        throw ERROR_MESSAGE;
      }
    })
    .catch((err) => dispatch(fetchCategoryDataFailure()));
};
