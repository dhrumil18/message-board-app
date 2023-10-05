import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MessageBoard = () => {
  const token = "LT1gftArgz6Ku5-V";
  // State to store messages
  const [messages, setMessages] = useState([]);

  // State to store the new message input
  const [newMessage, setNewMessage] = useState("");

  // State for sorting options
  const [sortBy, setSortBy] = useState("Default"); // Default to sorting by default

  useEffect(() => {
    getMessages();
  }, []);

  // Function to get all messages
  const getMessages = async () => {
    // Define the Axios request configuration
    const axiosConfig = {
      method: "GET",
      url: "https://mapi.harmoney.dev/api/v1/messages/",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    // Send the Axios request
    axios(axiosConfig)
      .then((response) => {
        console.log("API Response:", response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("API Request Error:", error);
      });
  };

  // Function to post a new message
  const postMessage = async (text) => {
    const axiosConfig = {
      method: "POST",
      url: "https://mapi.harmoney.dev/api/v1/messages/",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ text }),
    };

    try {
      // Send the Axios request
      const response = await axios(axiosConfig);
      console.log("API Response:", response.data);
      if (response.data) {
        getMessages();
        setNewMessage("");
        showSuccessToast("Message posted Successfully");
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  // Function to delete a message by ID
  const deleteMessage = async (id) => {
    const axiosConfig = {
      method: "DELETE",
      url: `https://mapi.harmoney.dev/api/v1/messages/${id}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    try {
      // Send the Axios request
      const response = await axios(axiosConfig);
      console.log("res", response);
      if (response.status == 204) {
        // Remove the deleted message from the state
        setMessages(messages.filter((message) => message.id !== id));
        showInfoToast("Message deleted Successfully");
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  // Function to handle sorting
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Sort the messages based on the selected sorting option
  const sortedMessages = [...messages].sort((a, b) => {
    if (sortBy === "timestamp-desc") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortBy === "timestamp-asce") {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else {
      // Default sorting (by ID)
      return b.id - a.id;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage, setMessagesPerPage] = useState(5); // Number of messages per page

  // Calculate the index of the last message on the current page
  const indexOfLastMessage = currentPage * messagesPerPage;
  // Calculate the index of the first message on the current page
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  // Get the current page of messages
  const currentMessages = sortedMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to show a success toast notification
  const showSuccessToast = (message) => {
    console.log("Success");
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Function to show an error toast notification
  const showInfoToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className="message-board">
      <h1>Message Board</h1>

      <div className="sort-class">
        <div>
          <label htmlFor="page" className="label-sort">
            Items per page:
          </label>
          <select
            id="page"
            onChange={(e) => {
              setMessagesPerPage(e.target.value);
            }}
            value={messagesPerPage}
            className="select-sort"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="label-sort">
            Sort by:
          </label>
          <select
            id="sort"
            onChange={handleSortChange}
            value={sortBy}
            className="select-sort"
          >
            <option value="timestamp-asce">Increasing Timestamp</option>
            <option value="timestamp-desc">Decreasing Timestamp</option>
            <option value="default">Default</option>
          </select>
        </div>
      </div>

      <MessageInput
        onSubmit={postMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />

      <MessageList messages={currentMessages} onDelete={deleteMessage} />

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(sortedMessages.length / messagesPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`page-button ${
                currentPage === index + 1 ? "active-page" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MessageBoard;
