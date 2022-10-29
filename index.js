import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

//Route
import homeRouter from './routes/home.js'
import userRouter from './routes/user.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 8080

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
  
//Use route
app.use('/api/home', homeRouter)
app.use('/api/register', userRouter)

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors)

app.listen(PORT, () => {
	connect();
	console.log("Connected to Server");
});


