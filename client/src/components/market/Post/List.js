import React from "react";
import MarketPostBox from "./Box";

const MarketPostList = props => {
  console.log(props.search);

  return (
    <>
      {/* {props.postings.length > 0 && <h2>Marketplace:</h2>} */}

      {props.search
        ? props.postings
            .filter(posting =>
              posting.description
                .toLowerCase()
                .includes(props.search.toLowerCase())
            )
            .map(posting => {
              return (
                <MarketPostBox
                  className={props.className}
                  posting={posting}
                  key={posting._id}
                />
              );
            })
        : props.postings.map(posting => {
            return (
              <MarketPostBox
                className={props.className}
                posting={posting}
                key={posting._id}
              />
            );
          })}
    </>
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
