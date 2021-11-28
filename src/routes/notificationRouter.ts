import express from "express"
const router = express.Router()
import { createNotificationValidation } from "../validations/NotificationValidation"
import { notificationController } from "../controller/NotificationController";

router.post('/notification', createNotificationValidation, notificationController.createNotification)

export default router