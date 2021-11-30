import express from "express"
const router = express.Router()
import { createNotificationValidation } from "../validations/NotificationValidation"
import { notificationController } from "../controller/NotificationController";

router.post('/notification', createNotificationValidation, notificationController.createNotification)
router.get('/notification', notificationController.getAllNotifications)

export default router