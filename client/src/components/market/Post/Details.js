import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

class MarketPostDetails extends React.Component {
  confirmApplicant = e => {
    const postId = this.props.paramsId.id;
    axios
      .put(`/api/postings/${postId}`, {
        postId: postId,
        applicantId: e
      })
      .then(response => {
        this.props.handleConfirm(response.data.posting.otherParty);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props.details);
    let { title, description, karma, creator } = this.props.details;
    // console.log(this.props.details.applicant);
    let applicantNameArr = this.props.details.applicant.map((applicant, i) => {
      return (
        <>
          {this.props.details.otherParty.length <= 0 &&
            this.props.details.creator._id === this.props.user._id && (
              <div>
                <h3 key={applicant._id}>
                  Applicant for the Posting: {applicant.facebookName}
                  {applicant.username}
                </h3>

                <button
                  className="example_c"
                  onClick={() => {
                    this.confirmApplicant(applicant._id);
                  }}
                >
                  Confirm
                </button>
              </div>
            )}
        </>
      );
    });

    return (
      <div className="post-card">
        <div style={{ backgroundColor: "black" }}>
          <img
            src="/karmalogo.png"
            width="45"
            height="45"
            style={{ margin: "10" }}
            className="d-inline-block  align-top"
            alt="KarmaApp logo"
          />
          <span style={{ color: "orange", margin: "auto 0" }}>{karma}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        {/* <img className="detail-img" src={creator.imageUrl} alt="" /> */}
        <p>Created By: {creator.facebookName}</p>
        {applicantNameArr}
        {this.props.details.otherParty.length >= 1 &&
          this.props.details.creator._id === this.props.user._id &&
          !this.props.details.isDone && (
            <div className="turkey">
              {this.props.details.otherParty[0].username} is helping you :)
            </div>
          )}
        {this.props.details.isDone &&
          (this.props.details.otherParty[0]._id === this.props.user._id ||
            this.props.details.creator._id === this.props.user._id) && (
            <div className="turkey">Job is done</div>
          )}
      </div>
    );
  }
}

export default MarketPostDetails;
