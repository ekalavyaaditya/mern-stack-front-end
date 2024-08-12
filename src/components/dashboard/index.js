import React, { useEffect, useState } from "react";
import { Link, useLocation, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { logout } from "../../actions/authAction";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import Profile from "./components/Profile.js";
import AddProfile from "./components/AddProfile.js";

const Dashboard = ({ auth, logout }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const openOption = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const avatarText = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const loguserout = (e) => {
    e.preventDefault();
    logout();
  };

  const { user } = auth;
  return (
    <div id="wrapper">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-text mx-3">E shop</div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className={`nav-item ${activePath === "/dashboard" ? "active" : ""}`} id="home">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className={`nav-item ${activePath === "/dashboard/addproduct" ? "active" : ""}`} id="AddProduct">
          <Link className="nav-link" to="/dashboard/addproduct">
            <span>Add Product</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className={`nav-item ${activePath === "/dashboard/product" ? "active" : ""}`} id="product">
          <Link className="nav-link" to="/dashboard/products">
            <span>Products</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className={`nav-item ${activePath === "/dashboard/profile" ? "active" : ""}`} id="profile">
          <Link className="nav-link" to="/dashboard/profile">
            <span>Profile</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className={`nav-item ${activePath === "/dashboard/addprofile" ? "active" : ""}`} id="addprofile">
          <Link className="nav-link" to="/dashboard/addprofile">
            <span>Add Profile</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className="nav-item">
          <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <Link className="collapse-item" to="/login">Login</Link>
              <Link className="collapse-item" to="/register">Register</Link>
              <Link className="collapse-item" to="/forgot-password">Forgot Password</Link>
              <div className="collapse-divider"></div>
              <h6 className="collapse-header">Other Pages:</h6>
              <Link className="collapse-item" to="/404">404 Page</Link>
              <Link className="collapse-item" to="/blank">Blank Page</Link>
            </div>
          </div>
        </li>
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-on2" style={{paddingBottom: "4px",left: "5px"}} />
                <div className="input-group-append" style={{marginLeft: "0px"}}>
                  <button className="btn btn-primary own-class" type="button">
                    <i className="fas fa-search fa-sm" style={{display:"flex",justifyContent:"center"}}></i>
                  </button>
                </div>
              </div>
            </form>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow d-sm-none">
                <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-search fa-fw"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                  <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                      <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              <div className="topbar-divider d-none d-sm-block"></div>
              <li className="nav-item dropdown no-arrow">
                <button className="nav-link dropdown-toggle"  onClick={openOption} id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.name}</span>
                  <Avatar size={40}>{user.name && avatarText(user.name)}</Avatar>
                </button>
                <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
                  <button className="dropdown-item" >
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </button>
                  <button className="dropdown-item">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={loguserout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/dashboard/addproduct" component={AddProduct} />
            <Route path="/dashboard/products" component={Products} />
            <Route path="/dashboard/profile" component={Profile} />
            <Route path="/dashboard/AddProfile" component={AddProfile} />
          </Switch>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Eshop {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Dashboard);