import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { facebooksignin } from "../services/api";

export class Facebook extends Component {
  responseFacebook = response => {
    console.log(response);

    const { name, id } = response;
    const imageUrl = response.picture.data.url;
    facebooksignin(name, id, imageUrl);
  };

  render() {
    return (
      <FacebookLogin
        appId="422359151955764"
        callback={this.responseFacebook}
        // autoLoad={true}
        fields="name,email,picture"
        icon="fa-facebook"
      />
    );
  }
}

export default Facebook;
