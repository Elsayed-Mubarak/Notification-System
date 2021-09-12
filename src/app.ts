import Logger from './utils/logger'
import mongoose from './config/mongoose'
import express from 'express'
import morgan from 'morgan'
require("colors");
Logger.dbConnection(mongoose);
require("dotenv").config({ path: "./env/config.env" })
const app = express();

//import swaggerUi from 'swagger-ui-express'
//const swaggerDocument = require("../swagger.json");

// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument)
// );

app.use(morgan("tiny"))

















export default app;