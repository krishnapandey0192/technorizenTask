import express from "express";
import cors from "cors";
import { environmentConfig } from "./config/environmentConfig.js";
import { dbConfig } from "./config/dbConfig.js";
import userRouter from "./routes/user/user.route.js";
import taskRouter from "./routes/task/task.route.js";

import { initialiseDefaultAdmin } from "./utils/initialAdmin.js";

const app = express();
dbConfig();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to the my server");
});

app.use("/api", userRouter);
app.use("/api", taskRouter);

initialiseDefaultAdmin();

app.listen(environmentConfig.port, () => {
  console.log(`server is running on the port : ${environmentConfig.port}`);
});
