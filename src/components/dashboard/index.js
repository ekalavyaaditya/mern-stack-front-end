import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { logout } from "../../actions/authAction";
import "../../dashboard.css"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: props.nestedRoute,
      search: "",
      isOpen: false,
      nav: false,
    };
    this.dropDown = this.dropDown.bind(this);
  }
  componentDidMount() {
    this.activeNav();
  }
  activeNav() {
    const pathname = window.location.pathname;
    const possibleRoutes = [
      { routes: "/dashboard", targetId: "home" },
      { routes: "/addProduct", targetId: "addProduct" },
      { routes: "/product", targetId: "products" },
      { routes: "/profile", targetId: "profile" },
    ];
    possibleRoutes.forEach(({ route, targetId }) => {
      window.jQuery(`#${targetId}`).removeClass("active");
      if (route === pathname) {
        window.jQuery(`#${targetId}`).addClass("active");
      }
    });
  }

  avatarText = (name) => {
    let initial = "";
    const names = name.split(" ");
    names.forEach((name) => {
      initial = initial + name.charAt(0);
    });
    return initial;
  };

  logUserOut = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  dropDown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  minNav = () => {
    this.setState((prevState) => ({
      nav: !prevState.nav,
    }));
  };
  handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    const Child = this.state.child;
    const { user } = this.props.auth;
    const pathname = window.location.pathname;
    const routeTitles = {
      "/dashboard": "Dash Board",
      "/dashboard/addProduct": "Add Product",
      "/dashboard/product": "Products",
      "/dashboard/profile": "Profile",
      "/dashboard/addprofile": " Create Profile",
    };

    const currentTitle = routeTitles[pathname] || "Dash Board";
    const className = this.state.nav
      ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion";

    return (
      <div>
        <div id="wrapper">
          <ul
            className={className}
            id="accordionSidebar"
          >
            <Link
              className="nav-item"
              style={{
                color: " white",
                margin: "10% auto"
              }}
              to="/dashboard"
            >
              {/* <div className="sidebar-brand-text mx-3"> */}
              <i className="fas fa-fw fa-store-alt"></i>
              <span>e-Shop</span>
              {/* </div> */}
            </Link>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="fas fa-fw fa-tachometer-alt "></i>
                <span>Merchant Store</span>
              </Link>
            </li>

            <hr className="sidebar-divider" />

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/addProduct">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Add A Product</span>
              </Link>
            </li>
            <hr className="sidebar-divider " />
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/product">
                <i className="fas fa-fw fa-table"></i>
                <span>Products</span>
              </Link>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/profile">
                <i className="far fa-id-card"></i>
                <span>Profile</span>
              </Link>
            </li>
            <hr className="sidebar-divider " />
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}>
                <button
                  id="sidebarToggleTop"
                  className="btn btn-link d-md-none rounded-circle mr-3"
                  onClick={this.minNav}
                >
                  <i className="fa fa-bars"></i>
                </button>
                <h1
                  style={{
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: 'auto',
                  }}
                >  {currentTitle}</h1>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className="navbar-nav" style={{ alignItems: "center" }} onClick={this.dropDown}>
                    {/* <div
                     
                      // style={{
                      //   display: "flex",
                      //   flexWrap: "wrap",
                      //   alignItems: "center",
                      //   justifyContent: "center",
                      //   width: "100%",
                      //   cursor: "pointer", // Optional: Indicates that this element is clickable
                      // }}
                    > */}
                    <span style={{ fontSize: 'small', marginLeft: 'auto' }}>
                      {user.name}
                    </span>
                    <Avatar size={40}>
                      {user.name && this.avatarText(user.name)}
                    </Avatar>
                    {/* </div> */}
                    {this.state.isOpen && (
                      <div
                        open={this.state.isOpen}
                        style={
                          this.state.isOpen
                            ? {
                              zIndex: 999,
                              background: "white",
                              marginTop: "21%",
                              position: "absolute",
                              right: "10px",
                            }
                            : {}
                        }>
                        <Link className="dropdown-item" to="/dashboard/profile">
                          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                          Profile
                        </Link>
                        <Link className="dropdown-item" to="#">
                          <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                          Settings
                        </Link>
                        <Link className="dropdown-item" to="#">
                          <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                          Activity Log
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link
                          className="dropdown-item"
                          onClick={this.logUserOut}
                        >
                          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                          Logout
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
              <Child {...this.props} search={this.state.search} />
            </div>

            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; eShop {new Date().getFullYear()}</span>
                </div>
              </div>
            </footer>
          </div>
        </div >

        <button className="scroll-to-top rounded"
          id="#page-top"
          onClick={this.handleScrollToTop}
        >
          <i className="fas fa-angle-up"></i>
        </button>

        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <Link className="btn btn-primary" to="login.html">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Dashboard);