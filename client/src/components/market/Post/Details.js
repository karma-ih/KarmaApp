import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
// import { Link } from "react-router-dom";
// import EditTask from "../EditTask";

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
    console.log(this.props.details.applicant);
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
    console.log(applicantNameArr);

    return (
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
        {applicantNameArr}
      </div>
    );
  }
}

// class TaskDetail extends Component {
//   state = {
//     title: "",
//     description: "",
//     project: ""
//   };

//   componentDidMount() {
//     this.getSingleTask();
//   }

//   getSingleTask = () => {
//     const { taskId } = this.props;
//     axios
//       .get(`/api/tasks/${taskId}`)
//       .then(responseFromApi => {
//         const theTask = responseFromApi.data;
//         this.setState(theTask);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   renderEditForm = () => {
//     if (!this.state.title) {
//       this.getSingleTask();
//     } else {
//       return (
//         <EditTask
//           theTask={this.state}
//           getTheTask={this.getSingleTask}
//           {...this.props}
//         />
//       );
//     }
//   };

//   deleteTask = () => {
//     const { params } = this.props.match;
//     axios
//       .delete(`http://localhost:5555/api/tasks/${params.id}`)
//       .then(() => {
//         this.props.history.push("/tasks");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   render() {
//     return (
//       <div>
//         <h1>{this.state.title}</h1>
//         <p>{this.state.description}</p>
//         <div>{this.renderEditForm()} </div>
//         <button onClick={() => this.deleteTask()}>Delete Task</button>
//         <Link to={"/tasks"}>Back to Tasks</Link>
//       </div>
//     );
//   }
// }

export default MarketPostDetails;
