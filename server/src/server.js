import app from "./app.js";
import http from "http";
import { Server } from "socket.io";

const PORT = 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("Користувач підключився:", socket.id);

  socket.on("disconnect", () => {
    console.log("Користувач відключився:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
