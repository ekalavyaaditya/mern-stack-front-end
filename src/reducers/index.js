import { combineReducers } from "redux";
import authReducers from "./authreducers";
import productsReducers from "./productReducers";
import profileReducers from "./profileReducers"

export default combineReducers({
    auth: authReducers,
    products: productsReducers,
    profile: profileReducers,
});