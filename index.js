import express from "express";
import cors from "cors";
import connectDatabase from "./src/db/data.js";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 9010;
//Initialize db
connectDatabase();
//Define middleware
app.use(cors());
app.use(express.json());
//Define router

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

//Run Server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
