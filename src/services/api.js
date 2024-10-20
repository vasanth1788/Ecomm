import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
const getProductsServices = ({
  isSearch = false,
  searchValue,
  limit = 10,
  skip = 0,
}) => {
  const url = isSearch
    ? `products/search?q=${searchValue}&limit=${limit}&skip=${skip}&select=title,thumbnail`
    : `products?limit=${limit}&skip=${skip}&select=title,thumbnail`;
  return axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/${url}`)
    .then((res) => res);
};

const getCategoryServices = () =>
  axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/products/category-list`)
    .then((res) => res);

const getSelectedCategoryProduct = ({ category }) =>
  axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/products/category/${category}`)
    .then((res) => res);

export { getProductsServices, getCategoryServices, getSelectedCategoryProduct };
