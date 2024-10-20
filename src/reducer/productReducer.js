import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../types";
import { getArrayIntoObj } from "../utils";

const initialState = {
  loading: false,
  data: {
    products: {},
    total: 0,
    skip: 0,
    limit: 0,
    hasMore: true,
  },
  error: false,
};

const products = (state = initialState, action) => {
  const { type, data } = action ?? {};

  switch (type) {
    case FETCH_PRODUCTS_REQUEST: {
      return {
        loading: true,
        data: state?.data,
        error: false,
      };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      const newProducts = getArrayIntoObj({ dataList: data?.products });
      return {
        loading: false,
        data: {
          ...state.data,
          products: data?.isSearch
            ? { ...newProducts }
            : { ...state?.data?.products, ...newProducts },
          total: data?.total,
          skip: data?.skip,
          limit: data?.limit,
        },
        error: false,
      };
    }
    case FETCH_PRODUCTS_FAILURE: {
      return {
        loading: false,
        data: state?.data,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default products;
