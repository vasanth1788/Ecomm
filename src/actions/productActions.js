import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../types";
import { getProductsServices } from "../services/api";

export const fetchProductsDataRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductDataSuccess = (products, isSearch) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  data: { ...products, isSearch: isSearch ?? false },
});

export const fetchProductsDataFailure = () => ({
  type: FETCH_PRODUCTS_FAILURE,
});

export const getProducts = async ({ isSearch, searchValue, limit, skip }) => {
  return await getProductsServices({ isSearch, searchValue, limit, skip }).then(
    (res) => res
  );
};
