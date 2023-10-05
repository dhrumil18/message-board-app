# Message Board App

A React-based message board.

## Getting Started

1. Clone the repo: `git clone https://github.com/dhrumil18/message-board-app.git`
2. Install: `npm install`
3. Run: `npm start`

## Usage

- Post, view, and delete messages.
- Pagination for message navigation.
- Change pagination length (items per page)
- Toast messages on deleting and adding of messages
- Sorting-option available

## NOTE

- Please change the token mentioned in the file MessageBoard.js to the required token. I have hardcoded with my token for now. (The ideal approach is to set such data in .env as explained below)
- It is always good to use .env file to storage API-endpoints, tokens etc.
  Eg REACT_APP_API_URL = "https://mapi.harmoney.dev/api/v1/messages/";
  And then we can access this data using process.env.REACT_APP_API_URL wherever we want
