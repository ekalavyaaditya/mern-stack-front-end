//  import axios from "axios";
import { jwtDecode } from "jwt-decode";

const isDevelopment = window.location.hostname.includes("localhost");

const getServer = () => {
  return isDevelopment ? "http://localhost:5000" : "http://34.41.56.207:5000";
};

const decodeUser = () => {
  const token = localStorage.getItem("token");
  return jwtDecode(token);
};

export { getServer, decodeUser };
