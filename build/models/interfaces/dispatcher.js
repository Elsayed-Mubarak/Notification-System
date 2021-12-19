"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToTopicType = exports.dispatcher = void 0;
var dispatcher = function (message) {
    console.log("************** dispatcher ***************");
    console.log(message);
};
exports.dispatcher = dispatcher;
var convertToTopicType = function (type) {
    return type.split(" ");
};
exports.convertToTopicType = convertToTopicType;
