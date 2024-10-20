import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Search from "../components/search";
import Product from "../components/Product";
import Category from "../components/Category";
import {
  fetchProductsDataRequest,
  fetchProductDataSuccess,
  fetchProductsDataFailure,
  getProducts,
} from "../actions/productActions";
import { getCategories } from "../actions/categoryActions";
import { getSelectedCategoryProducts } from "../actions/selectedCategoryProductActions";
import { SUCCESS_STATUS_CODE_200, ERROR_MESSAGE } from "../constant";

const HomePage = () => {
  const SELECTED_CATEGORY_INITIAL_STATE = "";
  const SELECTED_SEARCH_VALUE = "";
  const INITIAL_LOAD_VALUE = true;
  const INITIAL_IS_INFINITE_SCROLL_VALUE = false;

  const dispatch = useDispatch();
  const {
    data: { products, total, skip, limit },
    loading: allProductLoading,
    error: allProductError,
  } = useSelector((state) => state.products);

  const {
    data: { products: categoryProduct },
    loading: categoryProductLoading,
    error: categoryProductError,
  } = useSelector((state) => state.categoryProducts);

  const [selectedCategory, setSelectedCategory] = useState(
    SELECTED_CATEGORY_INITIAL_STATE
  );
  const [searchValue, setSearchValue] = useState(SELECTED_SEARCH_VALUE);
  const [initialLoad, setInitialLoad] = useState(INITIAL_LOAD_VALUE);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(
    INITIAL_IS_INFINITE_SCROLL_VALUE
  );

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const getProductsAction = ({ isSearch, limit, skip, searchValue = "" }) => {
    getProducts({
      isSearch: isSearch,
      limit: limit,
      skip: skip,
      searchValue: searchValue,
    })
      .then((res) => {
        if (res.status === SUCCESS_STATUS_CODE_200) {
          const { data } = res;
          dispatch(fetchProductDataSuccess(data, isSearch));
        } else {
          throw ERROR_MESSAGE;
        }
      })
      .catch((err) => dispatch(fetchProductsDataFailure()));
  };

  useEffect(() => {
    setIsInfiniteScroll((prev) => !prev);
    dispatch(fetchProductsDataRequest());
    getProductsAction({ isSearch: false, limit: 10, skip: 0 });
    getCategories({ dispatch });
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      getSelectedCategoryProducts({ dispatch, category: selectedCategory });
    }
  }, [dispatch, selectedCategory]);

  const productList = !!selectedCategory
    ? categoryProduct
    : Object.values(products);
  const productLoading = !!selectedCategory
    ? categoryProductLoading
    : allProductLoading;
  const productError = !!selectedCategory
    ? categoryProductError
    : allProductError;

  const onChangeHandler = (e) => {
    setIsInfiniteScroll(INITIAL_IS_INFINITE_SCROLL_VALUE);
    setSearchValue(SELECTED_SEARCH_VALUE);
    const { value } = e.target;
    setSelectedCategory(value);
  };

  const onSearchHandler = (e) => {
    setInitialLoad(false);
    setIsInfiniteScroll(INITIAL_IS_INFINITE_SCROLL_VALUE);
    setSelectedCategory(SELECTED_CATEGORY_INITIAL_STATE);
    const { value } = e.target;
    setSearchValue(value);
  };

  const debounceFunction = _.debounce((value) => {
    getProductsAction({
      isSearch: true,
      searchValue: value,
      limit: 0,
      skip: 0,
    });
  }, 1000);

  useEffect(() => {
    if (!initialLoad && searchValue) {
      debounceFunction(searchValue);
    }
  }, [initialLoad, searchValue]);

  useEffect(() => {
    return () => {
      debounceFunction.cancel();
    };
  }, []);

  const infiniteScroll = () => {
    if (total >= productList?.length) {
      getProductsAction({
        isSearch: false,
        limit: limit + 10,
        skip: skip + 10,
      });
    }
  };

  return (
    <div className="container">
      <div className="panel left-panel">
        {!categoriesLoading && !categoriesError && (
          <Category
            data={categoriesData}
            onChangeHandler={onChangeHandler}
            value={selectedCategory}
          />
        )}
      </div>
      <div className="vertical-divider" />
      <div className="panel right-panel">
        <>
          <Search onChange={onSearchHandler} value={searchValue} />
        </>
        {productLoading && <div>Loading</div>}
        {productError && <div>Something went wrong</div>}
        {!productLoading && !productError && (
          <Product
            data={productList}
            infiniteScroll={infiniteScroll}
            total={total}
            isInfiniteScroll={isInfiniteScroll}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
