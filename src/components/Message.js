import React from "react";

const Message = ({ message, onDelete }) => {
  return (
    <div>
      <p>{message.text}</p>
      <button onClick={() => onDelete(message.id)}>Delete</button>
    </div>
  );
};

export default Message;
