import express from "express";
// import bodyParser from 'body-parser'
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

//Route
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import tokenRouter from "./routes/token.js";
import schoolRouter from "./routes/school.js";
import departmentRouter from "./routes/department.js";
import categoryRouter from "./routes/category.js";
import subjectRouter from "./routes/subject.js";
import subjectScoreRouter from "./routes/subjectScore.js";

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.listen(PORT, () => {
  connect();
  console.log("Connected to Server");
});

// app.use(bodyParser.json({limit: "30mb", extended: true}))
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
