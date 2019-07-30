import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import CloudinaryWidget from "../components/CloudinaryWidget";
import { signup } from "../services/api";

class SignupInfo extends Component {
  state = {
    email: "",
    phoneNumber: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
    imageUrl: "",
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { username, password } = this.props.location.data;

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
      signup(
        username,
        password,
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
          this.props.history.push("/market");
        })
        .catch(err => {
          this.setState({ error: err.response.data.message });
        });
    }
  };

  handleCloudinary = event => {
    this.setState({ imageUrl: event });
  };

  render() {
    console.log(this.props.location);
    return (
      <React.Fragment>
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

          <Button type="submit">Save Changes</Button>
        </Form>
        <CloudinaryWidget handleCloudinary={this.handleCloudinary} />
      </React.Fragment>
    );
  }
}

export default SignupInfo;

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
