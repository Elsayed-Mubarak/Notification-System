"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var UserGroupValidation_1 = require("./../validations/UserGroupValidation");
var GroupValidation_1 = require("./../validations/GroupValidation");
var UserController_1 = require("../controller/UserController");
var UserValidation_1 = require("../validations/UserValidation");
router.post('/user', UserValidation_1.userValidation, UserController_1.userController.createUser);
router.post('/group', GroupValidation_1.groupValidation, UserController_1.userController.createGroup);
router.post('/user-group', UserGroupValidation_1.UserGroupValidation, UserController_1.userController.addUsersToGroup);
exports.default = router;
