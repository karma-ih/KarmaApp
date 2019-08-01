import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/api";
import Facebook from "../components/Facebook";

class SignupInfo extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
    imageUrl: "",
    facebookId: "",
    facebookName: "",
    imageUrl: "",
    error: ""
  };

  setError = error => {
    this.setState({ error });
  };

  handleFacebook = (facebookId, facebookName, imageUrl) => {
    this.setState({ facebookId, facebookName, imageUrl });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    // const { username, password } = this.props.location.data;

    const {
      username,
      password,
      facebookId,
      facebookName,
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
        imageUrl,
        facebookId,
        facebookName
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

  render() {
    // console.log(this.props.location);
    return (
      <React.Fragment>
        {this.state.error !== "Facebook verification complete" && (
          <Facebook
            setError={this.setError}
            handleFacebook={this.handleFacebook}
          />
        )}
        {this.state.facebookId && (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
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

            {this.state.error === "Facebook verification complete" && (
              <Button type="submit">Save Changes</Button>
            )}
          </Form>
        )}
      </React.Fragment>
    );
  }
}

export default SignupInfo;

// Password regex:
//   ^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$
