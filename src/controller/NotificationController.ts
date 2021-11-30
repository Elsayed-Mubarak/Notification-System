import { KafkaProvider } from './../providers/kafka.provider';
import NotificationFactory from './../factory/NotificationFactory';
import { Request, Response } from 'express'
import NotificationService from '../services/NotificationService'
import HandleErrors from '../utils/handleErrors'
import { ResponseCode } from '../models/enums/StatusCode'
import { Slack } from '../hooks/Slack';
import Constants from '../models/Constants';
import { MessageFromEvent } from '../models/interfaces/BaseProvider'
import { convertToTopicType } from '../models/interfaces/dispatcher'
import { Status } from "../models/enums/NotificationStatus";
class NotificationController {

    private notificationService: NotificationService;
    private notificationFactory: NotificationFactory;
    private kafkaProvider: KafkaProvider;
    private slack: Slack;
    //private event: events
    constructor() {
        this.notificationService = new NotificationService();
        this.notificationFactory = new NotificationFactory();
        this.kafkaProvider = new KafkaProvider(Constants.KAFKA_OPTS);
        this.slack = new Slack(Constants.SLACK_WEBHOOK_URL);
        //  this.event = new events.EventEmitter();
    }
    createNotification = async (req: Request, res: Response) => {
        try {
            let createdNotification = await this.notificationService.createNotification(req.body);
            let { _id, type } = createdNotification;
            //Get notifier service
            const notificationService = this.notificationFactory.getNotifierService(type);
            await this.notificationService.addNotificationToUsers(_id);

            //Send message with target provider
            let sentNotification: any = notificationService.send(createdNotification);

            //Send message to kafka broker on topic ${type}
            const notificationId = _id.toString();
            const notificationType = type.toString();
            const topics: string[] = convertToTopicType(type);
            await this.kafkaProvider.publishMessage(notificationId, notificationType, createdNotification);
            const sendMessageFromEvent = async (message: MessageFromEvent) => {
                if (message._id.toString() === notificationId && message.topic === notificationType) {

                    createdNotification.status = Status.SENT;
                    await Promise.all([createdNotification.save(), this.slack.sendHook(JSON.stringify(createdNotification))])

                    console.log(`
                    ### **** Concumer_Subscribed_On_Notification_ID : {${message._id}} **** ###
                    ### **** Read_Notification_From_Topic : {${message.topic}} **** ###
                    ### **** With Message {${JSON.stringify(message.data)}} ***** ###
                    ****************************************************************************
                    `);
                }
            }
            await Promise.all([this.kafkaProvider.subscribe(topics), this.kafkaProvider.readMessagesFromTopics(sendMessageFromEvent)])
            return res.status(ResponseCode.CREATED).json({ message: 'NOTIFICATION_CREATED_SUCESSIFULLY', createdNotification })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }

    getAllNotifications = async (req: Request, res: Response) => {
        try {
            const notifications = await this.notificationService.listAllNotification();
            return res.status(ResponseCode.Success).json({ message: 'SUCESS', ALL_NOTIFICATIONS: notifications })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }

}

export const notificationController = new NotificationController();