"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Language_1 = require("./enums/Language");
var UserSchema = new mongoose_1.Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    lang: {
        type: String,
        enum: Object.values(Language_1.languageEnum),
        default: Language_1.languageEnum.en, required: true
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
