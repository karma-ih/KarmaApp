import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  state = { title: "", description: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { title, description } = this.state;
    axios
      .post("/api/tasks", { title, description })
      .then(response => {
        //   this.props.getData();
        this.props.updateTask({ title, description, _id: response.data._id });
        this.setState({ title: "", description: "" });
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
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddTask;
