import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import EditTask from "../EditTask";

const MarketPostDetails = props => {
  console.log(props.details);
  let { title, description } = props.details;
  console.log(props.details.applicant);
  let applicantNameArr = props.details.applicant.map((applicant, i) => {
    return (
      <h3 key={i}>
        Applicant for the Posting: {applicant.facebookName}
        {applicant.username}
      </h3>
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
};

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
