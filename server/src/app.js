import express from "express";
import cors from "cors";
import requestsRoutes from "./routes/requestsRoutes.js";
import teamsRoutes from "./routes/teamsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/requests", requestsRoutes);
app.use("/api/teams", teamsRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({  
    message: "Backend works",
  });
});

export default app;
