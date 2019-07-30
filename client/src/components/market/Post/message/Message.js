import React from "react";

const Message = props => {
  const message = props.message.message;
  const user = props.message.user.username;
  return (
    <div>
      <h1>{message}</h1>
      <h1>{user}</h1>
    </div>
  );
};

export default Message;
