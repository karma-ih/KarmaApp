import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class MarketPostForm extends Component {
  state = {
    title: "",
    description: "",
    karma: 0,
    street: "",
    zip: "",
    city: "",
    latitude: 0,
    longitude: 0
  };

  componentDidMount() {
    // const _locateUser = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("_locateUser", latitude);
      console.log("_locateUser", longitude);
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
    });
  }

  //   setTimeout(() => {
  //     _locateUser();
  //   }, 1000);
  // }

  handleSubmit = event => {
    event.preventDefault();
    const {
      title,
      description,
      karma,
      street,
      zip,
      city,
      latitude,
      longitude
    } = this.state;
    axios
      .post("/api/postings", {
        title,
        description,
        karma,
        street,
        zip,
        city,
        latitude,
        longitude
      })
      .then(response => {
        //   this.props.refreshList();
        this.setState({
          title: "",
          description: "",
          karma: 0,
          street: "",
          zip: "",
          city: ""
        });
      })
      .catch(err => console.log(err));
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
          ​
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
          ​<Button type="submit">Add</Button>
        </Form>
      </div>
    );
  }
}

export default MarketPostForm;
