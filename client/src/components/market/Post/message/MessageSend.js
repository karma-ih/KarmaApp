import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export class MessageSend extends Component {
  state = {
    message: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.props.user._id);
    console.log(this.props.id.id);
    const userId = this.props.user._id;
    const taskId = this.props.id.id;
    const { message } = this.state;

    console.log(
      `The message is ${message} The taskID is ${taskId} and the userId is ${userId}`
    );

    axios
      .post(`/api/postings/${taskId}/message`, {
        userId,
        message
      })

      .then(response => {
        this.props.refreshData();
        this.setState({
          //   id,
          message: ""
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
      <div class="msgsend-card">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message Field</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </Form.Group>
          ​
          <button className="example_c" type="submit">
            Send
          </button>
        </Form>
      </div>
    );
  }
}

export default MessageSend;
