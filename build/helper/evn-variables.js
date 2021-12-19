"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
var ENV = /** @class */ (function () {
    function ENV() {
    }
    ENV.API_VERSION = process.env.API_VERSION;
    ENV.STAGE_TYPE = process.env.STAGE_TYPE;
    ENV.ENABLE_LOGGING = process.env.ENABLE_LOGGING;
    return ENV;
}());
exports.ENV = ENV;
