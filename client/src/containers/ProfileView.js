import React, { Component } from "react";
import Profile from "../components/user/Profile";

class ProfileView extends Component {
  render() {
    return (
      <div>
        <Profile user={this.props.user} />
      </div>
    );
  }
}

export default ProfileView;
