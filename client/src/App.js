import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import TaskList from "./components/tasks/TaskList";
import NavigationBar from "./components/navbar/NavigationBar";
import TaskDetail from "./components/tasks/TaskDetail";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Home from "./containers/Home";
import "bootstrap/dist/css/bootstrap.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/tasks" component={TaskList} />
          <Route exact path="/tasks/:id" component={TaskDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
