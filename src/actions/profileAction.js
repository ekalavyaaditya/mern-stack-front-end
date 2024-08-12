import axios from "axios";
import { getServer } from "../utill";
import {GET_PROFILE,PROFILE_ERROR} from "./types"

export const getProfile = (id) => async dispatch=>{
        try {
            const res =await axios.get(`${getServer()}/api/profile/${id}`);
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {meg: error.response.statusType},
            });
        }
}
export const createProfile = (profileData, history)=>async dispatch=>{
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };
        axios.post(`${getServer()}/api/profile/`,profileData,config)
        .then((_)=>{
          history.push("profile");
        })
    } catch (err) {
        const error = err.response.data.errors;
    if (error) {
      dispatch({
        type: error,
        payload: error,
      }); 
    } else {
      dispatch({
        type: PROFILE_ERROR,
        payload: {meg: error.response.statusType},
      });
    }
    }
}
export const deletaAccount = (history) =>async (dispatch)=>{
  try{
    axios.delete(`${getServer()}/api/profile`)
    .then((_)=>{
      localStorage.removeItem("token");
      history.push("/");
      window.location.reload();
    })
  }
  catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload: {meg: err.response.statusType},
    }); 
  }
}