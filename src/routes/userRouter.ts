import express from "express";
const router = express.Router();

import { UserGroupValidation } from './../validations/UserGroupValidation';
import { groupValidation } from './../validations/GroupValidation';
import { userController } from "../controller/UserController"
import { userValidation } from "../validations/UserValidation";

router.post('/user', userValidation, userController.createUser);
router.post('/group', groupValidation, userController.createGroup);
router.post('/user-group', UserGroupValidation, userController.addUsersToGroup);

export default router;