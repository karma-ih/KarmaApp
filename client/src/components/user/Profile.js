import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = props => {
  console.log(props.user);
  const { email, phoneNumber, imageUrl } = props.user;
  const { street, city, postalCode, country } = props.user.address;
  return (
    <>
      <img src={imageUrl} alt="user image" />
      <p> Email: {email}</p>
      <p> Tel.: {phoneNumber}</p>
      <h2>Address:</h2>
      <p>Street:{street}</p>
      <p>City: {city}</p>
      <p>Zip: {postalCode}</p>
      <p>Country: {country}</p>
      <Link to="/profile/edit">
        <Button>Edit User Information</Button>
      </Link>
    </>
  );
};

export default Profile;
