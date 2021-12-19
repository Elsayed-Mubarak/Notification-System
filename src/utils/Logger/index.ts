import winston, { addColors, createLogger, transports } from 'winston';
import 'winston-mongodb';
import * as colors from 'colors'
const { timestamp, combine, printf, colorize, align, label, json, metadata, errors, splat, simple } = winston.format;
import Config from "../../config"
import { Keys } from '../../models/interfaces/Keys';


const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
}

// Link the colors with winston.
addColors(colors);

// Define the format of the message.
// Define the format of the message.
// const logFormat = printf(({ level, message, timestamp, stack }) => {
//   // formating the log outcome to show/store
//   return `${level === "error" ? "❌" : "✅"} ${level}: ${message} ${level === "error" ? "| 🕗 " + timestamp.substring(0, 19) : ""
//     }   ${"\n"} ${level === "error" ? stack : ""} ${"\n"}`;
// });

const logFormat = printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`);

const format = combine(
  errors({ stack: false }), // log the full stack
  // label({
  //   label: `Label🏷️`
  // }),
  timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  // colorize({ all: true }),
  align(),
  logFormat,
  // metadata(), // >>>> ADD THIS LINE TO STORE the ERR OBJECT IN META field
  // metadata({ fillExcept: ['level', 'message', 'label', 'timestamp'] }),
  json(),
  splat(),
  simple()
)

const options = {
  file: {
    level: 'info',
    name: 'app.info',
    filename: `src/logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine(
      colorize({ all: true })
    )
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `src/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    format: combine(
      colorize({ all: true })
    )
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    timestamp: () => new Date(),
    colorize: true,
    format: combine(
      colorize({ all: true })
    )
  },
  mongoError: {
    level: 'error',
    //mongo database connection link
    db: `${Config.dbURI}`,
    options: {
      useUnifiedTopology: true
    },
    storeHost: true,
    // A collection to save json formatted logs
    collection: 'server_logs'
  },
  debug: {
    filename: "src/logs/debug.log",
    level: "debug",
    handleExceptions: true,
    timestamp: () => new Date(),
    format: combine(
      colorize({ all: true })
    )
  },
  warn: {
    filename: "src/logs/warn.log",
    level: "warn",
    handleExceptions: true,
    timestamp: () => new Date(),
    format: combine(
      colorize({ all: true }),
    )
  }
};

const loggerTransports = [
  // Allow to print all the error level messages inside the error.log file in dev or db in prod
  // (process.env.NODE_ENV !== "production" // in case errros level ==> error
  //   ? new transports.File(options.errorFile)
  //   : new transports.MongoDB(options.mongoError)),
  // Allow the use the console to print the messages in dev env or file in prod
  // (process.env.NODE_ENV !== "production"
  //   ? new winston.transports.Console(options.console)
  //   : new transports.File(options.file))
];

if (process.env.NODE_ENV === "production") {
  loggerTransports.push(new transports.MongoDB(options.mongoError), new winston.transports.File(options.warn), new winston.transports.Console(options.console));
} else {
  loggerTransports.push(new transports.File(options.errorFile), new winston.transports.File(options.debug), new winston.transports.Console(options.console));
}



const Logger = createLogger({
  level: level(),
  levels,
  format,
  transports: loggerTransports,
  exitOnError: true // do not exit on handled exceptions
});


export default Logger;