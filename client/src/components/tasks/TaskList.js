import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddTask from "./AddTask";

class TaskList extends Component {
  state = { listOfTasks: [] };

  getAllTasks = () => {
    axios.get("http://localhost:5555/api/tasks").then(responseFromApi => {
      this.setState({ listOfTasks: responseFromApi.data });
    });
  };

  componentDidMount() {
    this.getAllTasks();
  }

  render() {
    return (
      <div>
        <div style={{ width: "60%", float: "left" }}>
          {this.state.listOfTasks.map(task => {
            return (
              <div key={task._id}>
                <Link to={`/tasks/${task._id}`}>
                  <h3>{task.title}</h3>
                </Link>
                {/* <p style={{maxWidth: '400px'}} >{task.description} </p> */}
              </div>
            );
          })}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <AddTask getData={() => this.getAllTasks()} /> {/* <== !!! */}
        </div>
      </div>
    );
  }
}

export default TaskList;