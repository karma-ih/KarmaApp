import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

class MarketPostForm extends Component {
  state = {
    title: "",
    description: "",
    karma: 0,
    selectedLocation: "current",
    street: "",
    zip: "",
    city: "",
    latitude: 0,
    longitude: 0,
    message: [],
    error: ""
  };

  componentDidMount() {
    // const _locateUser = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log("_locateUser", latitude);
      // console.log("_locateUser", longitude);
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = this.props.user;
    const {
      title,
      description,
      karma,
      selectedLocation,
      street,
      zip,
      city,
      latitude,
      longitude
    } = this.state;

    axios
      .post("/api/postings", {
        user,
        title,
        description,
        karma,
        selectedLocation,
        street,
        zip,
        city,
        latitude,
        longitude
      })
      .then(response => {
        console.log(response);
        this.props.setUser(response.data);
        this.setState({
          title: "",
          description: "",
          karma: 0,
          selectedLocation: "current",
          street: "",
          zip: "",
          city: "",
          error: ""
        });
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>
          ​
          <Form.Group>
            <Form.Label>Karma:</Form.Label>
            <Form.Control
              type="number"
              name="karma"
              value={this.state.karma}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="radio"
              id="user-location"
              label="current location"
              name="selectedLocation"
              value="current"
              checked={this.state.selectedLocation === "current"}
              onChange={this.handleChange}
            />
            <Form.Check
              type="radio"
              id="home-location"
              label="home address"
              name="selectedLocation"
              value="home"
              checked={this.state.selectedLocation === "home"}
              onChange={this.handleChange}
            />
            <Form.Check
              type="radio"
              id="other-location"
              label="other"
              name="selectedLocation"
              value="other"
              checked={this.state.selectedLocation === "other"}
              onChange={this.handleChange}
            />
          </Form.Group>
          ​
          {this.state.selectedLocation === "other" ? (
            <>
              <Form.Group>
                <Form.Label>Street:</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={this.state.street}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Zip:</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={this.state.zip}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </>
          ) : (
            <></>
          )}
          {this.state.error && (
            <Alert variant="warning">{this.state.error}</Alert>
          )}
          ​<Button type="submit">Add</Button>
        </Form>
      </div>
    );
  }
}

export default MarketPostForm;
