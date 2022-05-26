const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
// this is so we can disconnect for our socker.io server, it'll run anytime soneone closes their connection to the server.
server.listen(3001, () => {
  console.log("server is live");
});
