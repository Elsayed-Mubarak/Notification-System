import Logger from './utils/logger'
import mongoose from './config/mongoose'
import express from 'express'
import morgan from 'morgan'
const cors = require('cors')
require("colors");
Logger.dbConnection(mongoose);
require("dotenv").config({ path: "./env/config.env" })
const app = express();
app.use(express.json());


import notificationRouter from './routes/notificationRouter'
import userRouter from './routes/userRouter'
import Constants from './models/Constants'

app.use(morgan("tiny"))

app.use(
    cors({
        credentials: true,
        origin: Constants.ORIGIN_CORS,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'origin',
            'Access-Control-Allow-Headers',
        ],
        optionsSuccessStatus: 204,
        preflightContinue: false,
    }),
)

app.use('/v1', userRouter)
app.use('/v1', notificationRouter)

app.use((err, req, res, next) => {
    console.log("...catch middelware.....", err)
})

export default app;