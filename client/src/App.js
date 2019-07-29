import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
// import TaskList from "./components/market/Post/PostingsList";
import NavigationBar from "./components/navbar/NavigationBar";
// import TaskDetail from "./components/market/Post/Details";
import PostingDetails from "./containers/PostingDetails";
import Postings from "./containers/Postings";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Home from "./containers/Home";
import AppBar from "./components/appbar/AppBar";
import Protected from "./components/Protected";
import AddPosting from "./containers/AddPosting";
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
            redirectPath="/market"
            setUser={this.setUser}
            user={!this.state.user}
            component={Signup}
          />
          <Protected
            exact
            path="/login"
            redirectPath="/market"
            setUser={this.setUser}
            user={!this.state.user}
            component={Login}
          />
          <Protected
            exact
            path="/market"
            redirectPath="/login"
            user={this.state.user}
            component={Postings}
          />
          <Protected
            exact
            path="/market/post"
            redirectPath="/login"
            user={this.state.user}
            component={AddPosting}
          />
          <Protected
            exact
            path="/market/:id"
            user={this.state.user}
            component={PostingDetails}
          />
          <Route render={() => <h2>404 Page not found</h2>} />
        </Switch>
        <AppBar />
      </div>
    );
  }
}

export default App;
