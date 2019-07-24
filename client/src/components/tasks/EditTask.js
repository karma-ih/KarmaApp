import React, { Component } from "react";
import axios from "axios";

class EditTask extends Component {
  state = {
    title: this.props.theTask.title,
    description: this.props.theTask.description
  };

  handleFormSubmit = event => {
    const { title, description } = this.state;
    event.preventDefault();

    axios
      .put(`http://localhost:5555/api/tasks/${this.props.theTask._id}`, {
        title,
        description
      })
      .then(() => {
        this.props.getTheProject();
        this.props.history.push("/tasks");
      })
      .catch(err => {
        console.log(err);
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
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />
          <label>Description: </label>
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

export default EditTask;
