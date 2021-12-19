"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importStar(require("winston"));
require("winston-mongodb");
var _a = winston_1.default.format, timestamp = _a.timestamp, combine = _a.combine, printf = _a.printf, colorize = _a.colorize, align = _a.align, label = _a.label, json = _a.json, metadata = _a.metadata, errors = _a.errors, splat = _a.splat, simple = _a.simple;
var config_1 = __importDefault(require("../../config"));
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
var level = function () {
    var env = process.env.NODE_ENV || 'development';
    var isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
var colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};
// Link the colors with winston.
(0, winston_1.addColors)(colors);
// Define the format of the message.
// Define the format of the message.
// const logFormat = printf(({ level, message, timestamp, stack }) => {
//   // formating the log outcome to show/store
//   return `${level === "error" ? "❌" : "✅"} ${level}: ${message} ${level === "error" ? "| 🕗 " + timestamp.substring(0, 19) : ""
//     }   ${"\n"} ${level === "error" ? stack : ""} ${"\n"}`;
// });
var logFormat = printf(function (info) { return info.level + ": " + info.label + ": " + [info.timestamp] + ": " + info.message; });
var format = combine(errors({ stack: false }), // log the full stack
// label({
//   label: `Label🏷️`
// }),
timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), 
// colorize({ all: true }),
align(), logFormat, 
// metadata(), // >>>> ADD THIS LINE TO STORE the ERR OBJECT IN META field
// metadata({ fillExcept: ['level', 'message', 'label', 'timestamp'] }),
json(), splat(), simple());
var options = {
    file: {
        level: 'info',
        name: 'app.info',
        filename: "src/logs/info.log",
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        format: combine(colorize({ all: true }))
    },
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: "src/logs/error.log",
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 100,
        format: combine(colorize({ all: true }))
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        timestamp: function () { return new Date(); },
        colorize: true,
        format: combine(colorize({ all: true }))
    },
    mongoError: {
        level: 'error',
        //mongo database connection link
        db: "" + config_1.default.dbURI,
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
        timestamp: function () { return new Date(); },
        format: combine(colorize({ all: true }))
    },
    warn: {
        filename: "src/logs/warn.log",
        level: "warn",
        handleExceptions: true,
        timestamp: function () { return new Date(); },
        format: combine(colorize({ all: true }))
    }
};
var loggerTransports = [
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
    loggerTransports.push(new winston_1.transports.MongoDB(options.mongoError), new winston_1.default.transports.File(options.warn), new winston_1.default.transports.Console(options.console));
}
else {
    loggerTransports.push(new winston_1.transports.File(options.errorFile), new winston_1.default.transports.File(options.debug), new winston_1.default.transports.Console(options.console));
}
var Logger = (0, winston_1.createLogger)({
    level: level(),
    levels: levels,
    format: format,
    transports: loggerTransports,
    exitOnError: true // do not exit on handled exceptions
});
exports.default = Logger;
