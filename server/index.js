const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
    express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);
// localhost:27017/chat
// console.log(process.env.MONGO_URL);
mongoose
    .connect("mongodb://127.0.0.1:27017/chat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connect successfully");
    })
    .catch((err) => {
        console.log(err.message);
        console.log(1);
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});
