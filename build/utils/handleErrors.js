"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleErrors(error) {
    var statusCode = error.statusCode ? error.statusCode : 500 /* SomethingWentWrong */;
    var message = error.message ? error.message : 'Internal_Server_Error';
    var status = error.status ? error.status : 'Server_Error';
    return { statusCode: statusCode, status: status, message: message };
}
exports.default = handleErrors;
