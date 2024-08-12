import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import setAuthToken from "./utill/setAuthToken";
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
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(setCurrentUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/dashboard/home" component={Home} />
            <ProtectedRoute path="/dashboard/addproduct" component={AddProduct} />
            <ProtectedRoute path="/dashboard/product" component={Product} />
            <ProtectedRoute path="/dashboard/profile" component={Profile} />
            <ProtectedRoute
              path="/dashboard/addprofile"
              component={AddProfile}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
