import express from "express"
const router = express.Router()
import { userController } from "../controller/UserController"
import { userValidation } from "../validations/UserValidation";


router.post('/', userValidation, userController.createUser);

export default router
