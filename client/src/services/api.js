import axios from "axios";

const login = (username, password) =>
  axios
    .post("/api/auth/login", { username: username, password: password })
    .then(response => response.data);

const signup = (username, password) =>
  axios
    .post("/api/auth/signup", { username: username, password: password })
    .then(response => response.data);

const editProfile = (
  username,
  password,
  email,
  phoneNumber,
  karmaPts,
  street,
  postalCode,
  city,
  country
) =>
  axios
    .put("/api/auth/editprofile", {
      username,
      password,
      email,
      phoneNumber,
      karmaPts,
      street,
      postalCode,
      city,
      country
    })
    .then(response => response.data);

const logout = () =>
  axios.post("/api/auth/logout").then(response => response.data);

const facebooksignin = (name, id) =>
  axios
    .post("/api/auth/signup/facebook", { name: name, id: id })
    .then(response => response.data);

export { login, signup, logout, facebooksignin, editProfile };
