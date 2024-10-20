import {
  FETCH_SELECTED_CATEGORY_PRODUCT_REQUEST,
  FETCH_SELECTED_CATEGORY_PRODUCT_SUCCESS,
  FETCH_SELECTED_CATEGORY_PRODUCT_FAILURE,
} from "../types";

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const selectedCategoryProducts = (state = initialState, action) => {
  const { type, data } = action ?? {};

  switch (type) {
    case FETCH_SELECTED_CATEGORY_PRODUCT_REQUEST: {
      return {
        loading: true,
        data: [],
        error: false,
      };
    }
    case FETCH_SELECTED_CATEGORY_PRODUCT_SUCCESS: {
      return {
        loading: false,
        data: data,
        error: false,
      };
    }
    case FETCH_SELECTED_CATEGORY_PRODUCT_FAILURE: {
      return {
        loading: false,
        data: [],
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default selectedCategoryProducts;
