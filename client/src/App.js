import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "mapbox-gl/dist/mapbox-gl.css";
import NavigationBar from "./components/navbar/NavigationBar";
import PostingDetails from "./containers/PostingDetails";
import Postings from "./containers/Postings";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Home from "./containers/Home";
import AppBar from "./components/appbar/AppBar";
import Protected from "./components/Protected";
import AddPosting from "./containers/AddPosting";
import MapView from "./containers/MapView";
import EditProfile from "./containers/EditProfile";
import ProfileView from "./containers/ProfileView";
import SignupInfo from "./containers/SignupTwo";
import DashBoard from "./containers/DashBoard";

class App extends Component {
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
            user={!this.state.user}
            component={Signup}
          />
          <Protected
            exact
            path="/signup/info"
            redirectPath="/market"
            setUser={this.setUser}
            user={!this.state.user}
            component={SignupInfo}
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
            path="/profile/edit"
            redirectPath="/login"
            setUser={this.setUser}
            user={this.state.user}
            component={EditProfile}
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
            setUser={this.setUser}
            component={AddPosting}
          />
          <Protected
            exact
            path="/market/:id"
            user={this.state.user}
            component={PostingDetails}
          />
          <Protected
            exact
            path="/profile"
            user={this.state.user}
            component={ProfileView}
          />
          <Protected
            exact
            path="/map/"
            user={this.state.user}
            component={MapView}
          />
          <Protected
            exact
            path="/dashboard"
            user={this.state.user}
            component={DashBoard}
          />
          <Route render={() => <h2>404 Page not found</h2>} />
        </Switch>
        <AppBar />
      </div>
    );
  }
}

export default App;
