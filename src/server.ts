import Logger from './utils/logger'
import mongoose from './config/mongoose'
import express from 'express'
import morgan from 'morgan'
require("colors");
Logger.dbConnection(mongoose);
require("dotenv").config({ path: "./env/config.env" })
const app = express();
app.use(express.json());
import notificationRouter from './routes/notificationRouter'
import userRouter from './routes/userRouter'

app.use(morgan("tiny"))

app.use('/v1/', userRouter)
app.use('/v1/', notificationRouter)

app.use((err, req, res, next) => {
    console.log("...catch middelware.....", err)
})

export default app;