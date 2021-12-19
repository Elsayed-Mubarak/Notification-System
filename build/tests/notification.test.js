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
// tests/acccountType.test.js
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var Notification_1 = __importDefault(require("../models/Notification"));
var User_1 = __importDefault(require("../models/User"));
var Group_1 = __importDefault(require("../models/Group"));
var User_Group_1 = __importDefault(require("../models/User_Group"));
afterAll(function (done) {
    mongoose_1.default.connection.close(function () {
        done();
    });
});
beforeAll(function (done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        mongoose_1.default.connection.dropDatabase();
        done();
        return [2 /*return*/];
    });
}); });
describe("POST: /v1/user/", function () {
    it("Create User Should Return Status(201) ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post("/v1/user/")
                        .send({
                        "name": "minahani",
                        "phone": "01898768762",
                        "email": "mina.sayed@gmail.com",
                        "lang": "ar"
                    })];
                case 1:
                    user = _a.sent();
                    expect(user.body.message)
                        .toBe("USER_CREATED_SUCESSIFULLY");
                    expect(user.statusCode)
                        .toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST: /v1/group/", function () {
    it("Create User Should Return Status(201) and req.body.createdGroup to equal {electric} ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post("/v1/group/")
                        .send({
                        "name": "electric"
                    })];
                case 1:
                    user = _a.sent();
                    expect(user.body.message)
                        .toBe("Group_CREATED_SUCESSIFULLY");
                    expect(user.statusCode)
                        .toEqual(201);
                    expect(user.body.createdGroup)
                        .toBe("electric");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST: /v1/user-group/", function () {
    it("Should Add Users To Specific Group ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, group, res, userGroup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.findOne({})];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Group_1.default.findOne({})];
                case 2:
                    group = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .post("/v1/user-group/")
                            .send({
                            "groupId": group._id,
                            "userIds": [user._id]
                        })];
                case 3:
                    res = _a.sent();
                    return [4 /*yield*/, User_Group_1.default.findOne({ userId: user._id, groupId: group._id })];
                case 4:
                    userGroup = _a.sent();
                    expect(res.body.message)
                        .toBe("USER_Added_To_Group_SUCESSIFULLY");
                    expect(res.statusCode)
                        .toEqual(201);
                    expect(res.body.usersGroup)
                        .toEqual(expect.arrayContaining([
                        {
                            "userId": user._id,
                            "groupId": group._id,
                            "_id": userGroup._id,
                        }
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST: /v1/notification/", function () {
    it("Should create notification \n    then get Notifier Service using factory design pattern\n    then add this notification to users\n    then send notification by selected provider with PENDING status\n    then publish message to apache kafka topic,\n    and when consumer subscribe to targent notification,\n    will update notification status to SENT\n    then send notification to slack webhook.\n     ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.findOne({})];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .post("/v1/notification/")
                            .send({
                            "title": "elasticsearch_analyzer",
                            "body": "elasticsearch_analyzer for arabic and english language",
                            "type": "SMS",
                            "userId": user._id
                        })];
                case 2:
                    res = _a.sent();
                    expect(res.body.message)
                        .toBe("NOTIFICATION_CREATED_SUCESSIFULLY");
                    expect(res.statusCode)
                        .toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET: /v1/notification/", function () {
    it("Should Get All Notifications\n     ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var notification, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Notification_1.default.find()];
                case 1:
                    notification = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                            .get("/v1/notification/")];
                case 2:
                    res = _a.sent();
                    expect(res.body.message)
                        .toBe("SUCESS");
                    expect(res.statusCode)
                        .toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
