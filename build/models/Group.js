"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var GroupSchema = new mongoose_1.Schema({
    name: { type: String }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Group', GroupSchema);
