import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from "../types";

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const category = (state = initialState, action) => {
  const { type, data } = action ?? {};

  switch (type) {
    case FETCH_CATEGORY_REQUEST: {
      return {
        loading: true,
        data: [],
        error: false,
      };
    }
    case FETCH_CATEGORY_SUCCESS: {
      return {
        loading: false,
        data: data,
        error: false,
      };
    }
    case FETCH_CATEGORY_FAILURE: {
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

export default category;
