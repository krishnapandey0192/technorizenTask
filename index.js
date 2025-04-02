import express from "express";
import cors from "cors";
import { environmentConfig } from "./config/environmentConfig.js";
import { dbConfig } from "./config/dbConfig.js";
import userRouter from "./routes/user/user.route.js";
import bookRouter from "./routes/book/book.route.js";
import reviewRouter from "./routes/review/review.route.js";

const app = express();
dbConfig();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to the my server");
});

app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", reviewRouter);

app.listen(environmentConfig.port, () => {
  console.log(`server is running on the port : ${environmentConfig.port}`);
});
