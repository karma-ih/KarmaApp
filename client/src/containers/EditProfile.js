import React, { Component } from "react";
import { editProfile } from "../services/api";
import { Form, Button, Alert } from "react-bootstrap";
import CloudinaryWidget from "../components/CloudinaryWidget";

class EditProfile extends Component {
  state = {
    email: this.props.user.email,
    phoneNumber: this.props.user.phoneNumber,
    street: this.props.user.address.street,
    postalCode: this.props.user.address.postalCode,
    city: this.props.user.address.city,
    country: this.props.user.address.country,
    imageUrl: this.props.user.imageUrl,
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const {
      email,
      phoneNumber,
      street,
      postalCode,
      city,
      country,
      imageUrl
    } = this.state;

    event.preventDefault();

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (validateEmail(email)) {
      editProfile(
        email,
        phoneNumber,
        street,
        postalCode,
        city,
        country,
        imageUrl
      )
        .then(data => {
          this.props.setUser(data);
          this.props.history.push("/profile");
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: err.response.data.message });
        });
    }
  };

  handleCloudinary = event => {
    this.setState({ imageUrl: event });
  };

  render() {
    console.log(this.state.imageUrl);
    return (
      <React.Fragment>
        <CloudinaryWidget handleCloudinary={this.handleCloudinary} />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>
            <Form.Control
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="street">Street:</Form.Label>
            <Form.Control
              type="text"
              name="street"
              id="street"
              value={this.state.street}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="city">City:</Form.Label>
            <Form.Control
              type="text"
              name="city"
              id="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="postalCode">Postal code:</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              id="postalCode"
              value={this.state.postalCode}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="country">Country:</Form.Label>
            <Form.Control
              type="text"
              name="country"
              id="country"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </Form.Group>

          {this.state.error && (
            <Alert variant="warning">{this.state.error}</Alert>
          )}

          <button className="example_c" type="submit">
            Save Changes
          </button>
        </Form>
      </React.Fragment>
    );
  }
}

export default EditProfile;

// What is this regex for @AJ ? Do we still need this or can it be deleted? (Dominik asking)

// 1.)

//   ^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$

// 2.)

// if (name === "password") {
//     function validateEmail(email) {
//       var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//       return re.test(String(email).toLowerCase());
//     }
//     if (validateEmail(value)) {
//       this.setState({
//         [name]: value
//       });
//     }
//   }
