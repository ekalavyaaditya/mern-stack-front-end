import axios from "axios";
import { getServer } from "../utill";
import { GET_CART, ERROR } from "./types";

export const addToCart = (conxtext) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(`${getServer()}/api/cart`, conxtext, config)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err,
      });
    });
};

export const getCart = () => (dispatch) => {
  axios
    .get(`${getServer()}/api/cart`)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERROR,
        payload: err,
      })
    );
};

export const removeFromCart = (context) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { id } = context;
  return axios
    .put(`${getServer()}/api/cart/${id}`, context, config)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    })
    .catch((err) =>
      dispatch({
        type: ERROR,
        payload: err,
      })
    );
};
