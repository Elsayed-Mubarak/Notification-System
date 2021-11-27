import { KafkaProvider } from './../providers/kafka.provider';
import NotificationFactory from './../factory/NotificationFactory';
import { Request, Response } from 'express'
import NotificationService from '../services/NotificationService'
import HandleErrors from '../utils/handleErrors'
import { ResponseCode } from '../models/enums/StatusCode'
import Slack from '../hooks/Slack';
import Constants from '../models/Constants';
import { MessageFromEvent } from '../models/interfaces/BaseProvider'
import * as events from 'events'
import { dispatcher, convertToTopicType } from '../models/interfaces/dispatcher'
import { Status } from "../models/enums/NotificationStatus";
class NotificationController {

    private notificationService: NotificationService;
    private notificationFactory: NotificationFactory;
    private kafkaProvider: KafkaProvider
    //private event: events
    constructor() {
        this.notificationService = new NotificationService();
        this.notificationFactory = new NotificationFactory();
        this.kafkaProvider = new KafkaProvider(Constants.KAFKA_OPTS);
        //  this.event = new events.EventEmitter();
    }
    createNotification = async (req: Request, res: Response) => {
        try {
            const createdNotification = await this.notificationService.createNotification(req.body);
            let { _id, type } = createdNotification;
            const notificationService = this.notificationFactory.getNotifierService(type);
            const addedNotification = await this.notificationService.addNotificationToUsers(_id);
            //send message
            let sentNotification: any = notificationService.send(createdNotification);
            // send message to kafka broker on topic ${type}
            await this.kafkaProvider.publishMessage(_id, type.toString(), createdNotification);

            //   this.event.on("sendNotification", dispatcher);
            const sendMessageFromEvent = (message: MessageFromEvent) => {
                if (message._id.toString() === _id.toString() && message.topic === type) {
                    //  this.event.emit("Kafka_Test", message);
                    console.log(`
                    ... ### Concumer_Subscribed_On_Notification_ID : ${message._id} 
                    Notification_From_Topic : ${message.topic} With Message ${message.data} .... ###
                    `);
                    console.log(` .... #################################################### ....  `);
                }
            }
            let topics: string[] = convertToTopicType(type);
            await this.kafkaProvider.subscribe(topics);
            await this.kafkaProvider.readMessagesFromTopics(sendMessageFromEvent)
            if (sentNotification) {
                await this.notificationService.updateNotificationStatus(_id, Status.SENT);
            }
            return res.status(ResponseCode.CREATED).json({ message: 'NOTIFICATION_CREATED_SUCESSIFULLY', createdNotification })
        } catch (error) {
            console.log("................", error)
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }

    sendNotification = async (req: Request, res: Response) => {
        try {
            return res.status(ResponseCode.Success).json({ message: 'Notification_Sent_SUCESSIFULLY' })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }

}

export const notificationController = new NotificationController();