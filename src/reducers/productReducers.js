import { GET_PRODUCT, GET_PRODUCTS, PORDUCT_ERROR } from "../actions/types";
const initialState = {
  products: [],
  product: {},
  errors: {},
};

const productReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: payload,
      };
    case PORDUCT_ERROR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};
export default productReducers;
