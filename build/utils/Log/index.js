"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Collection of logging methods. Useful for making the output easier to read and understand.
 *
 * @param msg
*/
/* tslint:disable:no-console */
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.trace = function (msg) {
        console.log("<T> " + (new Date().toLocaleString() + " ").cyan.italic + ": " + ("" + msg).bold);
    };
    Log.info = function (msg) {
        console.log("<I>  " + (new Date().toLocaleString() + " ").cyan.italic + ": " + ("" + msg).green.bold);
    };
    Log.warn = function (msg) {
        console.error("<W> " + (new Date().toLocaleString() + " ").cyan.italic + ": " + ("" + msg).magenta.bold);
    };
    Log.error = function (msg) {
        console.error("<E> " + (new Date().toLocaleString() + " ").cyan.italic + ": " + ("" + msg).red.bold);
    };
    Log.test = function (msg) {
        console.log("<X> " + (new Date().toLocaleString() + " ").cyan.italic + ": " + ("" + msg).yellow.bold);
    };
    return Log;
}());
exports.default = Log;
