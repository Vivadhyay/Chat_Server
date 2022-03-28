const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());

// const PORT = 3030;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("My Chatting App");
});

server.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("listening on *:3030");
  });

//   server.listen(PORT, () => {
//     console.log("listening on *:3030");
//   });