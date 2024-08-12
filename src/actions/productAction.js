import axios from "axios";
import { GET_PRODUCT, GET_PRODUCTS, PORDUCT_ERROR } from "./types";
import { getServer } from "../utill";
export const getproduct = () => async (dispatch) => {
  try {
    const res = await axios.get(`${getServer()}/api/products`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PORDUCT_ERROR,
      payload: { status: err.response.status },
    });
  }
};

export const addproduct = (productData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post(`${getServer()}/api/products`, productData, config);
    history.push("/dashboard/products");
  } catch (err) {
    dispatch({
      type: PORDUCT_ERROR,
      payload: { status: err.response.status },
    });
  }
};

export const getInstructorProduct = (id) => async (dispatch) => {
  try {
    // console.log("id==>>",id)
    const res = await axios.get(`${getServer()}/api/products/instructors/${id}`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
    // debugger;
  } catch (error) {
    dispatch({
      type: PORDUCT_ERROR,
      payload: { status: error.response?.status },
    });
  }
};


export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${getServer()}/api/product/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PORDUCT_ERROR,
      payload: { status: error.response.status },
    });
  }
};
