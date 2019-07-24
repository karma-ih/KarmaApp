import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import TaskList from "./components/tasks/TaskList";
import Navbar from "./components/navbar/Navbar";
import TaskDetail from "./components/tasks/TaskDetail";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/tasks" component={TaskList} />
          <Route exact path="/tasks/:id" component={TaskDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
