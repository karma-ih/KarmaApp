import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { facebooksignin } from "../services/api";

export class Facebook extends Component {
  responseFacebook = response => {
    console.log(response);

    const { name, id } = response;
    facebooksignin(name, id);
  };

  render() {
    return (
      <FacebookLogin
        appId="422359151955764"
        callback={this.responseFacebook}
        icon="fa-facebook"
      />
    );
  }
}

export default Facebook;
