import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import setAuthToken from "./utill/setAuthToken";
import { decodeUser } from './utill';
import { addToCart } from './actions/cartAction.js'
import { setCurrentUser } from "./actions/authAction";
import ProtectedRoute from "./components/general/protectedRoute";
import Dashboard from "./components/dashboard";
import AddProduct from "./components/dashboard/components/AddProduct";
import Product from "./components/dashboard/components/Products";
import Home from "./components/dashboard/components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/landing";
import AddProfile from "./components/dashboard/components/AddProfile";
import Profile from "./components/dashboard/components/Profile.js";
import ProductDetails from "./components/landing/ProductDetails.js";
import Cart from "./components/cart/Cart.js"
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App(props) {
  useEffect(() => {
    store.dispatch(setCurrentUser());
  }, []);

  const grabProductFromStorage = () => {
    const userId = decodeUser().user.id;
    const cartProducts = JSON.parse(localStorage.getItem("products"));
    const context = { products: cartProducts, userId };
    store.dispatch(addToCart(context));
    localStorage.removeItem("products");
  };



  if (localStorage.getItem("token") && localStorage.getItem("products")) {
    grabProductFromStorage()
  }
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Switch>
            <ProtectedRoute
              path="/dashboard"
              exact
              component={() => (
                <Dashboard {...props} nestedRoute={Home} />
              )} />
            <ProtectedRoute
              path="/dashboard/addproduct" component={() => (
                <Dashboard {...props} nestedRoute={AddProduct} />
              )}
            />
            <ProtectedRoute
              path="/dashboard/product" component={() => (
                <Dashboard {...props} nestedRoute={Product} />
              )} />
            <ProtectedRoute
              path="/dashboard/profile" component={() => (
                <Dashboard {...props} nestedRoute={Profile} />
              )} />
            <ProtectedRoute
              path="/dashboard/addprofile" component={() => (
                <Dashboard {...props} nestedRoute={AddProfile} />
              )} />
            <ProtectedRoute
              path="/cart" component={Cart} />
            <Route
              exact path="/login" component={Login} />
            <Route
              exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
