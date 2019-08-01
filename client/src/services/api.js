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
  imageUrl,
  facebookId,
  facebookName
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
      imageUrl,
      facebookId,
      facebookName
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

const facebookverify = id =>
  axios
    .post("/api/auth//facebook/verify", { id })
    .then(response => response.data);

export { login, signup, logout, facebookverify, editProfile };
