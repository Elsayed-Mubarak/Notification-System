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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
var LOGGER = __importStar(require("logger"));
// TODO:- replace logger with simple-node-logger
// https://www.npmjs.com/package/simple-node-logger
var enums_1 = require("../models/enums/enums");
var evn_variables_1 = require("../helper/evn-variables");
var AppLogger = /** @class */ (function () {
    function AppLogger() {
    }
    AppLogger.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkLogLevel();
        this.logger.debug(args);
        if (this.level === enums_1.LoggerLevels.Debug) {
            console.debug('\u001b[' + 32 + 'm' + '[DEBUG] >>>>>' + '\u001b[0m', args, '\n');
        }
    };
    AppLogger.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkLogLevel();
        this.logger.info(args);
        if (this.level === enums_1.LoggerLevels.Debug) {
            console.info('\u001b[' + 93 + 'm' + '[INFO] >>>>>' + '\u001b[0m', args, '\n');
        }
    };
    AppLogger.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkLogLevel();
        this.logger.warn(args);
        if (this.level === enums_1.LoggerLevels.Debug) {
            console.warn('\u001b[' + 93 + 'm' + '[WARNING] >>>>>' + '\u001b[0m', args, '\n');
        }
    };
    AppLogger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkLogLevel();
        this.logger.error(args);
        if (this.level === enums_1.LoggerLevels.Debug) {
            console.error('\u001b[' + 31 + 'm' + '[ERROR] >>>>>' + '\u001b[0m', args, '\n');
        }
    };
    AppLogger.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkLogLevel();
        this.logger.fatal(args);
        if (this.level === enums_1.LoggerLevels.Debug) {
            console.error('\u001b[' + 31 + 'm' + '[FATAL][ERROR] >>>>>' + '\u001b[0m', args, '\n');
        }
    };
    AppLogger.checkLogLevel = function () {
        if (!this.level) {
            if (evn_variables_1.ENV.ENABLE_LOGGING == 'true' || evn_variables_1.ENV.STAGE_TYPE == "development" /* Development */) {
                this.level = enums_1.LoggerLevels.Debug;
            }
            else if (evn_variables_1.ENV.STAGE_TYPE == "test" /* Testing */) {
                this.level = enums_1.LoggerLevels.Info;
            }
            else if (evn_variables_1.ENV.STAGE_TYPE == "production" /* Production */) {
                this.level = enums_1.LoggerLevels.Error;
            }
            this.logger.setLevel(this.level);
        }
    };
    AppLogger.logger = LOGGER.createLogger('systemlogs.log');
    return AppLogger;
}());
exports.AppLogger = AppLogger;
