import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { facebookverify } from "../services/api";

class Facebook extends Component {
  responseFacebook = response => {
    console.log(response);
    const { id, name } = response;
    const imageUrl = response.picture.data.url;
    this.props.handleFacebook(id, name, imageUrl);
    facebookverify(id)
      .then(response => {
        this.props.setError(response.message);
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <FacebookLogin
        appId="2273317312918577"
        callback={this.responseFacebook}
        // autoLoad={true}
        fields="name,email,picture"
        icon="fa-facebook"
        textButton="verify with facebook"
      />
    );
  }
}

export default Facebook;
