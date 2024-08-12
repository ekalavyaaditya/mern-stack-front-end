import {
  ERROR,
  FAILURE_REGISTER,
  AUTH_ERROR,
  SET_CURRENT_USER,
  SUCCESSFUL_REGISTER,
  SUCCESSFUL_LOGIN,
  FAILURE_LOGIN,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  user: {},
  errors: [],
};

export default function authReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case SUCCESSFUL_REGISTER:
    case SUCCESSFUL_LOGIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case FAILURE_REGISTER:
    case AUTH_ERROR:
    case FAILURE_LOGIN:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
      };
    case ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
