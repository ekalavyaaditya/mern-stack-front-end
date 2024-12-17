import { combineReducers } from "redux";
import authReducers from "./authreducers";
import productsReducers from "./productReducers";
import profileReducers from "./profileReducers"
import cartreducers from "./cartreducers";
export default combineReducers({
    auth: authReducers,
    products: productsReducers,
    profile: profileReducers,
    cart: cartreducers,
});