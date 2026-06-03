import React, { useEffect, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spin } from "antd";
import store from "./store";
import setAuthToken from "./utill/setAuthToken";
import { decodeUser } from './utill';
import { addToCart } from './actions/cartAction.js'
import { setCurrentUser } from "./actions/authAction";
import ProtectedRoute from "./components/general/protectedRoute";
import "./App.css";

// Lazy loading components
const Dashboard = lazy(() => import("./components/dashboard"));
const AddProduct = lazy(() => import("./components/dashboard/components/AddProduct"));
const Product = lazy(() => import("./components/dashboard/components/Products"));
const Home = lazy(() => import("./components/dashboard/components/Home"));
const Register = lazy(() => import("./components/auth/Register"));
const Login = lazy(() => import("./components/auth/Login"));
const Landing = lazy(() => import("./components/landing"));
const AddProfile = lazy(() => import("./components/dashboard/components/AddProfile"));
const Profile = lazy(() => import("./components/dashboard/components/Profile.js"));
const ProductDetails = lazy(() => import("./components/landing/ProductDetails.js"));
const Cart = lazy(() => import("./components/cart/Cart.js"));

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
          <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spin size="large" />
            </div>
          }>
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
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
