"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
exports.catchAsync = catchAsync;
//catching errors in Async function
