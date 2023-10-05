import React from "react";

const MessageList = ({ messages, onDelete }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${seconds} ${ampm}`;
  };
  return (
    <ul className="message-list">
      {messages.map((message) => (
        <li key={message.id} className="message-item">
          <div className="message-item-parent">
            <div className="message-header">
              <span className="message-source">{message.source}</span>
              <span>-</span>
              <span className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
            <button
              onClick={() => onDelete(message.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
          <p className="message-text">{message.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
