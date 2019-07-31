import React from "react";
import Message from "./Message";
import MessageSend from "./MessageSend";

const MessageList = props => {
  // console.log(props.user);
  // console.log(props.id);
  // console.log(props);

  const messages = props.data.map((message, i) => {
    return <Message message={message} key={i} />;
  });
  return (
    <div>
      {messages}
      <MessageSend
        refreshData={props.refreshData}
        id={props.id}
        user={props.user}
      />
    </div>
  );
};

export default MessageList;
