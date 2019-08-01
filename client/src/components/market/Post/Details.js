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
    let { title, description } = this.props.details;
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

                <Button
                  onClick={() => {
                    this.confirmApplicant(applicant._id);
                  }}
                >
                  Confirm
                </Button>
              </div>
            )}
        </>
      );
    });

    return (
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
        {applicantNameArr}
        {this.props.details.otherParty.length >= 1 &&
          this.props.details.creator._id === this.props.user._id && (
            <div>
              {this.props.details.otherParty[0].username} is helping you :)
            </div>
          )}
      </div>
    );
  }
}

export default MarketPostDetails;
