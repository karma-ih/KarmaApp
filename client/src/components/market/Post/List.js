import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
import MarketPostBox from "./Box";
// import AddTask from "./Form";

const MarketPostList = props => {
  console.log(props);
  return (
    <div>
      {props.postings.length > 0 && <h2>Marketplace:</h2>}

      {props.postings.map(posting => {
        return (
          // <Link to={`/market/${posting._id}`}>
          <MarketPostBox posting={posting} key={posting._id} />
          // </Link>
          // <div key={posting._id}>
          //   <Link to={`/postings/${posting._id}`}>
          //     <h3>{posting.title}</h3>
          //   </Link>
          // </div>
        );
      })}
    </div>
  );
};

// class MarketPostList extends Component {
//   state = { listOfTasks: [] };

//   getAllTasks = () => {
//     axios.get("/api/tasks").then(responseFromApi => {
//       this.setState({ listOfTasks: responseFromApi.data });
//     });
//   };

//   updateTask = newTask => {
//     this.setState({ listOfTasks: [...this.state.listOfTasks, newTask] });
//   };

//   componentDidMount() {
//     this.getAllTasks();
//   }

//   render() {
//     return (
//       <div>
//         <div style={{ width: "60%", float: "left" }}>
//           {this.state.listOfTasks.map((task, i) => {
//             return (
//               <div key={task._id}>
//                 <Link to={`/tasks/${task._id}`}>
//                   <h3>{task.title}</h3>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//         <div style={{ width: "40%", float: "right" }}>
//           <AddTask
//             getData={() => this.getAllTasks()}
//             updateTask={this.updateTask}
//           />{" "}
//           {/* <== !!! */}
//         </div>
//       </div>
//     );
//   }
// }

export default MarketPostList;