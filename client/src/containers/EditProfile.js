import React, { Component } from "react";
import { editProfile } from "../services/api";
import { Form, Button, Alert } from "react-bootstrap";

export default class EditProfile extends Component {
  state = {
    name: this.props.user.username,
    password: this.props.user.password,
    // email: this.prop.user.email,
    // phoneNumber: this.prop.user.phoneNumber,
    // karmaPts: this.prop.user.karmaPts,
    // street: this.prop.user.address.street,
    // postalCode: this.prop.user.address.postalCode,
    // city: this.prop.user.address.city,
    // country: this.prop.user.address.country,
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
      username,
      password,
      email,
      phoneNumber,
      karmaPts,
      street,
      postalCode,
      city,
      country
    } = this.state;

    event.preventDefault();

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

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
    if (validateEmail(email)) {
      editProfile(
        username,
        password,
        email,
        phoneNumber,
        karmaPts,
        street,
        postalCode,
        city,
        country
      )
        .then(data => {
          this.props.setUser(data);
          this.props.history.push("/profile"); // Some issues here.
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: err.response.data.message });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" placeholder={this.state.name}>
              Username:
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password" placeholder={this.state.password}>
              Password:
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="email" placeholder={this.state.email}>
              Email:
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              htmlFor="Phone Number"
              placeholder={this.state.phoneNumber}
            >
              Phone Number:
            </Form.Label>
            <Form.Control
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="Street" placeholder={this.state.street}>
              Street:
            </Form.Label>
            <Form.Control
              type="text"
              name="street"
              id="street"
              value={this.state.street}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="city" placeholder={this.state.city}>
              City:
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              id="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="country" placeholder={this.state.country}>
              Country:
            </Form.Label>
            <Form.Control
              type="text"
              name="country"
              id="country"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label
              htmlFor="postalCode"
              placeholder={this.state.postalCode}
            >
              City:
            </Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              id="postalCode"
              value={this.state.postalCode}
              onChange={this.handleChange}
            />
          </Form.Group>

          {this.state.error && (
            <Alert variant="warning">{this.state.error}</Alert>
          )}

          <Button type="submit">Save Changes</Button>
        </Form>
      </React.Fragment>
    );
  }
}

//   //   ^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$
