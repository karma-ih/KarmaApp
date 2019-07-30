import axios from "axios";

const login = (username, password) =>
  axios
    .post("/api/auth/login", { username: username, password: password })
    .then(response => response.data);

const signup = (
  username,
  password,
  email,
  phoneNumber,
  street,
  postalCode,
  city,
  country,
  imageUrl
) =>
  axios
    .post("/api/auth/signup", {
      username,
      password,
      email,
      phoneNumber,
      street,
      postalCode,
      city,
      country,
      imageUrl
    })
    .then(response => response.data);

const editProfile = (
  email,
  phoneNumber,
  street,
  postalCode,
  city,
  country,
  imageUrl
) =>
  axios
    .put("/api/auth/editprofile", {
      email,
      phoneNumber,
      street,
      postalCode,
      city,
      country,
      imageUrl
    })
    .then(response => response.data);

const logout = () =>
  axios.post("/api/auth/logout").then(response => response.data);

const facebooksignin = (name, id, imageUrl) =>
  axios
    .post("/api/auth/signup/facebook", {
      name: name,
      id: id,
      imageUrl: imageUrl
    })
    .then(response => response.data);

export { login, signup, logout, facebooksignin, editProfile };
