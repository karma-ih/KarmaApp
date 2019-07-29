import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/api";
import Facebook from "../components/Facebook";
import CloudinaryWidget from "../components/CloudinaryWidget";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    imageUrl: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { username, password, imageUrl } = this.state;
    event.preventDefault();

    signup(username, password, imageUrl)
      .then(data => {
        this.props.setUser(data);
        this.props.history.push("/market");
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };

  handleCloudinary = event => {
    this.setState({ imageUrl: event });
  };

  render() {
    return (
      <React.Fragment>
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

          {this.state.error && (
            <Alert variant="warning">{this.state.error}</Alert>
          )}

          <Button type="submit">Signup</Button>
        </Form>
        <Facebook />
        <CloudinaryWidget handleCloudinary={this.handleCloudinary} />
      </React.Fragment>
    );
  }
}

export default Signup;
