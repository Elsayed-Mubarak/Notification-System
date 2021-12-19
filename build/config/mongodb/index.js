"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = __importDefault(require("../../utils/Log/"));
var config_1 = __importDefault(require("../../config"));
exports.default = {
    dbConnection: function (mongoose) {
        // When successfully connected
        mongoose.connection.on('connected', function () {
            console.log("Database Connected Successfully".green);
            Log_1.default.info('🟢 MongoDB connected successfully now!');
        });
        // If the connection throws an error
        mongoose.connection.on('error', function (err) {
            console.log(("Mongoose default connection error: " + err).red);
            console.log('=> if using local mongodb: make sure that mongo server is running \n'.red +
                '=> if using online mongodb: check your internet connection \n'.red);
            Log_1.default.error("[ Database =>] The connection to the database failed: " + err.message + ". = " + config_1.default.dbURI + " \u274C");
        });
        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected'.red);
            Log_1.default.error('🔴 Mongoose default connection is disconnected!');
        });
    }
};
