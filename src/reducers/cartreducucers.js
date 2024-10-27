import { GET_CART, ERROR } from "../actions/types";

const initalState = {
  cart: {},
  errors: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CART:
      return {
        ...state,
        cart: payload.cart,
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
