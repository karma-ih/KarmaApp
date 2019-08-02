import React from "react";

const Message = props => {
  const message = props.message.message;
  const user = props.message.user.username;
  console.log(props.message.user.imageUrl);

  const msgStyle = { display: "Flex", justifyContent: "space-between" };
  return (
    <div className="msg-card" style={msgStyle}>
      <div className="row">
        <div className="col-3">
          <img
            src={props.message.user.imageUrl}
            width="50"
            height="50"
            alt=""
          />
          <h5 style={{ fontWeight: "700" }}>
            <span style={{ margin: "0 auto", color: "orange" }}>{user}</span>
          </h5>
        </div>
        <div className="col-9 col-9-emergency" style={{ textAlign: "left" }}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
