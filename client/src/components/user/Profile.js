import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    console.log(this.props.user);
    const {
      username,
      email,
      phoneNumber,
      karmaPts,
      imageUrl
    } = this.props.user;

    return (
      <div>
        <img src={imageUrl} alt="" />
        <h1> {username}</h1>
        <p> Karma: {karmaPts}</p>
        <p> Email: {email}</p>
        <p> Tel. {phoneNumber}</p>
        {/* <p> Street: {street}</p>
        <p> City: {city}</p>
        <p> Country: {country}</p>
        <p> Postal Code: {postalCode}</p> */}
        <button type="submit" href="/EditProfile">
          "Edit Profile"
        </button>
      </div>
    );
  }
}