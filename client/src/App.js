import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import TaskList from "./components/tasks/TaskList";
import NavigationBar from "./components/navbar/NavigationBar";
import TaskDetail from "./components/tasks/TaskDetail";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Home from "./containers/Home";
import AppBar from "./components/appbar/AppBar";
import Protected from "./components/Protected";
import "bootstrap/dist/css/bootstrap.css";

export class App extends Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <NavigationBar setUser={this.setUser} user={this.state.user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Protected
            exact
            path="/signup"
            redirectPath="/projects"
            setUser={this.setUser}
            user={!this.state.user}
            component={Signup}
          />
          <Protected
            exact
            path="/login"
            redirectPath="/projects"
            setUser={this.setUser}
            user={!this.state.user}
            component={Login}
          />
          <Protected
            exact
            path="/tasks"
            redirectPath="/login"
            user={this.state.user}
            component={TaskList}
          />
          <Protected
            exact
            path="/tasks/:id"
            user={this.state.user}
            component={TaskDetail}
          />
        </Switch>
        <AppBar />
      </div>
    );
  }
}

export default App;
