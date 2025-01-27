import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { message as antdMessage } from "antd";
import Input from "../general/Input";
import { login } from "../../actions/authAction";
// import { decodeUser } from "../../utill";
import { addToCart } from "../../actions/cartAction";
import { Button } from "@mui/material";
import Navbar from "../general/Navbar";
import "./Login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillUpdate(nextProps) {
    localStorage.setItem("role", nextProps.user.role);
    if (nextProps.isAuthenticated === true) {
      antdMessage.success("Welcome");
      this.redirectToHome();
    }
    else {
      antdMessage.error('invalid email or password');
    }
  }

  redirectToHome = () => {
    setTimeout(() => {
      var role = localStorage.getItem("role");
      if (role === "customer") {
        window.location.href = "/";
      }
      else {
        window.location.href = "dashboard";
      }
    }, 1000);
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    if (email === "" && password === "") {
      antdMessage.error("Invailded email or password");
    }
    this.props.login(user)
  }
  render() {
    const { email, password } = this.state;
    const search = this.props.location.search;
    let split = search.split("redirect=");
    const redirect = split[split.length - 1];
    const hasRirect = redirect.length > 0 && search.includes("redirect");
    return (
      <div className="logbg">
        <Navbar />
        <div className="log">
          <form style={{ padding: "10px" }}>
            <h1>Sign In</h1>
            <p>Sing Into Your Account</p>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
            />
            <br />
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.onChange}
            />
            <br />
            <Button className="btn" onClick={this.onSubmit}>
              Sing In
            </Button>
            <p className="my-1">
              Dont Have an account?
              <Link to={`/register?role=customer${hasRirect ? "&redirect=" + redirect : ""}`}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login, addToCart })(Login);