const express = require("express");
const socket = require("socket.io");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
var socketManager = require("./SocketManager.js");

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs

var server = app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// socket setup
var io = socket(server);

io.on("connection", function(socket) {
  console.log("Made socket connection " + socket.id);
})