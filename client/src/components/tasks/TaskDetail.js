import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class TaskDetail extends Component {
  state = {};

  componentDidMount() {
    this.getSingleTask();
  }

  getSingleTask = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5555/api/tasks/${params.id}`)
      .then(responseFromApi => {
        const theTask = responseFromApi.data;
        this.setState(theTask);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <Link to={"/tasks"}>Back to Tasks</Link>
      </div>
    );
  }
}

export default TaskDetail;
