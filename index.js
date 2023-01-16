import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

//Route
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import departmentRouter from "./routes/department.js";
import postRouter from "./routes/post.js";
import schoolRouter from "./routes/school.js";
import subjectRouter from "./routes/subject.js";
import subjectScoreRouter from "./routes/subjectScore.js";
import tagRouter from "./routes/tag.js";
import tokenRouter from "./routes/token.js";
import userRouter from "./routes/user.js";
import semesterRouter from "./routes/semester.js";
import predictResultRouter from "./routes/predictResult.js";

const corsOptions = {
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
};

const app = express();
dotenv.config();

app.use(morgan("dev"));
const PORT = process.env.PORT || 8080;

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log(`Server is running on port: ${PORT}`);
    })
    .catch((err) => {
      throw err;
    });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

//Use route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/token", tokenRouter);
app.use("/api/school", schoolRouter);
app.use("/api/department", departmentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/subjectScore", subjectScoreRouter);
app.use("/api/tag", tagRouter);
app.use("/api/post", postRouter);
app.use("/api/semester", semesterRouter);
app.use("/api/predictResult", predictResultRouter);

app.listen(PORT, () => {
  connect();
  console.log("Connected to Server");
});
