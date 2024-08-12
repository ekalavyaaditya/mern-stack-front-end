import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../general/Input";
import { register } from "../../actions/authAction";
import "./RegisterStyle.css";
import { message } from "antd";
import { Button } from "@mui/material";
import Navbar from "../general/Navbar";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  redirectToHome = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit() {
    const url = new URLSearchParams(window.location.search);
    const rol = url.getAll("role");
    const { name, email, password, password2 } = this.state;

    if (name.trim() === "") {
      message.error("Name is required");
      return;
    } else if (email.trim() === "") {
      message.error("Email is required");
      return;
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
      message.error("Invalid email format");
      return;
    } else if (password.trim().length < 5) {
      message.error(
        "Password is required and should be more than 5 characters"
      );
      return;
    } else if (password2.trim() === "") {
      message.error("Confirm Password is required");
      return;
    } else if (password2 !== password) {
      message.error("Confirm Password does not match Password");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: rol[0],
    };
    this.props.register(newUser);
    const success = this.props.register(newUser);
    if (success) {
      message.success("Thank you for registering");
      this.redirectToHome();
    }
  }

  render() {
    const { name, password, password2, email } = this.state;
    return (
      <div className="Regbg">
        <Navbar/>
        <div className="Main">
          <h1 className="heading">Register</h1>
          <p className="pgr">Create Your Account</p>
          <div className="input-container">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
            />
            <br />
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
            <Input
              name="password2"
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={this.onChange}
            />
          </div>
          <br />
          <Button type="primary" className="Rbtn" onClick={this.onSubmit} style={{display: "flex"}}>
            Register
          </Button>
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);