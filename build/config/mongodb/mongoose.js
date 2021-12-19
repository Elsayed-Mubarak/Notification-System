"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../../config"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(config_1.default.dbURI, function (err) {
    if (err)
        return console.error(err);
    console.log('**************************************************************');
    console.log('connection successed to mongoDB>>> notification-system');
    console.log('**************************************************************');
});
exports.default = mongoose_1.default;
