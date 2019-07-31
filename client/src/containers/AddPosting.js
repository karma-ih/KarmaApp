import React, { Component } from "react";
import MarketPostForm from "../components/market/Post/Form";

class AddPosting extends Component {
  render() {
    return (
      <div>
        <MarketPostForm user={this.props.user} setUser={this.props.setUser} />
      </div>
    );
  }
}

export default AddPosting;
