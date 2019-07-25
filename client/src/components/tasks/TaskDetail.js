import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";

class TaskDetail extends Component {
  state = {};

  componentDidMount() {
    this.getSingleTask();
  }

  getSingleTask = () => {
    // const { params } = this.props.match;
    axios
      .then(responseFromApi => {
        const theTask = responseFromApi.data;
        this.setState(theTask);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleTask();
    } else {
      return (
        <EditTask
          theTask={this.state}
          getTheTask={this.getSingleTask}
          {...this.props}
        />
      );
    }
  };

  deleteTask = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5555/api/tasks/${params.id}`)
      .then(() => {
        this.props.history.push("/tasks");
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
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteTask()}>Delete Task</button>
        <Link to={"/tasks"}>Back to Tasks</Link>
      </div>
    );
  }
}

export default TaskDetail;
