import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import LogoutIcon from '@mui/icons-material/Logout';
import "./Navstyle.css";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const handleLogout = () => {
    logout();
  };
  const user = (
    <>
      <Link to="/dashboard" className="link">
        Dashboard
      </Link>
      <Link onClick={handleLogout} to="/" className="link">
        <LogoutIcon />
        Logout
      </Link>
    </>
  );

  const guest = (
    <>
      <Link to="/register?role=merchant" className="link">
        Merchants
      </Link>
      <Link to="/register?role=customer" className="link">
        Register
      </Link>
      <Link to="/login" className="link">
        Login
      </Link>
    </>
  );

  return (
    <nav className="navbarstyle">
      <Link to="/" className="bg">
        E-Shop
      </Link>
      {/* Display user links if authenticated, otherwise display guest links */}
      {isAuthenticated ? user : guest}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);