import React from "react";

const MessageInput = ({ onSubmit, newMessage, setNewMessage }) => {
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newMessage);
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newMessage}
        onChange={handleInputChange}
        placeholder="Type your message"
        className="message-input"
      />
      <button type="submit" className="message-submit">
        Post
      </button>
    </form>
  );
};

export default MessageInput;
