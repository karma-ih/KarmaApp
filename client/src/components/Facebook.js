import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

export class Facebook extends Component {
  responseFacebook = response => {
    console.log(response);
  };
  render() {
    return (
      <FacebookLogin
        appId="422359151955764"
        autoLoad
        callback={this.responseFacebook}
        icon="fa-facebook"
      />
    );
  }
}

export default Facebook;
