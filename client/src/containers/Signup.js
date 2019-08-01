import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
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

    this.props.history.push({
      pathname: "/signup/info",
      data: { username, password }
    });
  };

  render() {
    return (
      <div className="profile-card">
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
          <button className="example_c" type="submit">
            Signup
          </button>
        </Form>
      </div>
    );
  }
}

export default Signup;
