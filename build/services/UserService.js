"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Group_1 = __importDefault(require("../models/Group"));
var User_1 = __importDefault(require("../models/User"));
var User_Group_1 = __importDefault(require("../models/User_Group"));
var mongoose_1 = __importDefault(require("mongoose"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.createUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, phone, lang, exsistingUser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = data.name, email = data.email, phone = data.phone, lang = data.lang;
                        return [4 /*yield*/, User_1.default.findOne({ name: name, email: email, phone: phone })];
                    case 1:
                        exsistingUser = _a.sent();
                        if (exsistingUser)
                            throw { statusCode: 400 /* ValidationError */, status: 'Bad_Request', message: 'User_Already_Exsist' };
                        return [4 /*yield*/, User_1.default.create({ name: name, email: email, phone: phone, lang: lang })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.createGroup = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var name, exsistingGroup, createdGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = data.name;
                        return [4 /*yield*/, Group_1.default.findOne({ name: name })];
                    case 1:
                        exsistingGroup = _a.sent();
                        if (exsistingGroup)
                            throw { statusCode: 400 /* ValidationError */, status: 'Bad_Request', message: 'Group_Already_Exsist' };
                        return [4 /*yield*/, Group_1.default.create({ name: name })];
                    case 2:
                        createdGroup = _a.sent();
                        return [2 /*return*/, createdGroup];
                }
            });
        });
    };
    UserService.prototype.addUsersToGroup = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userIds, groupId, exsistingUser, exsistingGroup, isUserOnTheGroup, usersThatNeedToAddedToGroup, i, userId, usersGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIds = Array.isArray(data.userIds) ? data.userIds : "";
                        groupId = mongoose_1.default.Types.ObjectId.isValid(data.groupId) ? data.groupId : "";
                        return [4 /*yield*/, User_1.default.find({ _id: { $in: userIds } })];
                    case 1:
                        exsistingUser = _a.sent();
                        if (!exsistingUser)
                            throw new Error("User_Not_Found ");
                        return [4 /*yield*/, Group_1.default.findOne({ groupId: groupId }).lean()];
                    case 2:
                        exsistingGroup = _a.sent();
                        if (!exsistingGroup)
                            throw { statusCode: 400 /* ValidationError */, status: 'Bad_Request', message: 'Group_Not_Found' };
                        return [4 /*yield*/, User_Group_1.default.find({ _id: { $in: userIds }, groupId: groupId })];
                    case 3:
                        isUserOnTheGroup = _a.sent();
                        if (isUserOnTheGroup === null || isUserOnTheGroup === undefined)
                            throw { statusCode: 400 /* ValidationError */, status: 'Bad_Request', message: 'User_Already_on_This_Group' };
                        usersThatNeedToAddedToGroup = [];
                        for (i = 0; i < exsistingUser.length; i++) {
                            userId = exsistingUser[i]._id;
                            usersThatNeedToAddedToGroup.push({ userId: userId, groupId: groupId });
                        }
                        return [4 /*yield*/, User_Group_1.default.insertMany(usersThatNeedToAddedToGroup)];
                    case 4:
                        usersGroup = _a.sent();
                        return [2 /*return*/, usersGroup];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
