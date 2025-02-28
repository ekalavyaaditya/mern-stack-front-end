//  import axios from "axios";
import { jwtDecode } from "jwt-decode";

const isDevelopment = window.location.hostname.includes("localhost");
//  this is the static ip address for the back-end http://34.55.53.146:5000
const getServer = () => {
  return isDevelopment ? "http://34.55.53.146:5000" : "";
  // return isDevelopment ? "http://localhost:5000" : "http://34.55.53.146:5000";
};

const decodeUser = () => {
  const token = localStorage.getItem("token");
  return jwtDecode(token);
};

export { getServer, decodeUser };
