"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("./config/mongodb"));
var mongoose_1 = __importDefault(require("./config/mongodb/mongoose"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var notificationRouter_1 = __importDefault(require("./routes/notificationRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
require("colors");
mongodb_1.default.dbConnection(mongoose_1.default);
//require("dotenv").config({ path: "./env/config.env" })
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use('/v1', userRouter_1.default);
app.use('/v1', notificationRouter_1.default);
app.use(function (err, req, res, next) {
    console.log("...catch middelware.....", err);
});
exports.default = app;
