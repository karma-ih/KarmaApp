import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Protected from "./components/Protected";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import Home from "./containers/Home";
import Projects from "./containers/Projects";
import ProjectDetails from "./containers/ProjectDetails";
import TaskDetails from "./containers/TaskDetails";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

class App extends React.Component {
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
        <Navbar setUser={this.setUser} user={this.state.user} />
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
            path="/projects"
            redirectPath="/login"
            user={this.state.user}
            component={Projects}
          />
          <Protected
            exact
            path="/projects/:id"
            user={this.state.user}
            component={ProjectDetails}
          />
          <Protected
            exact
            path="/tasks/:id"
            user={this.state.user}
            component={TaskDetails}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
