import { GET_CART, ERROR } from "../actions/types";

const initialState = {
  cart: {},
  error: {},
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CART:
      return {
        ...state,
        cart: payload.result,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default cartReducer;