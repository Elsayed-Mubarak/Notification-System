import { Admin, Consumer, EachMessagePayload, ITopicConfig, Kafka, Producer } from 'kafkajs'
import { ResponseCode } from '../models/enums/StatusCode';
import { KafkaConnectionOptions, BaseProvider, MessageFromEvent } from '../models/interfaces/BaseProvider'

export class KafkaProvider implements BaseProvider {

    providerName = `KAFKA`;
    private provider: Kafka;
    private producer: Producer;
    private consumer: Consumer
    private admin: Admin;

    constructor(opt: KafkaConnectionOptions) {

        this.provider = new Kafka({ clientId: opt.clientId, brokers: opt.brokers });
        this.consumer = this.provider.consumer({ groupId: opt.groupId });
        this.producer = this.provider.producer();
        this.admin = this.provider.admin();

        this.createTopic().then();
    }
    async createTopic() {
        let inputTopics: any = [{ topic: 'SMS' }, { topic: 'PUSH_NOTIFICATION' }];
        const inputTopicsArry: string[] = inputTopics.map(item => item.topic)

        await this.admin.connect();
        let exsistingToics: string[] = await this.admin.listTopics();
        const isEqual = this.contains(exsistingToics, inputTopicsArry)
        if (exsistingToics && isEqual) {
            return
        }
        let isCreated = await this.admin.createTopics({ waitForLeaders: true, topics: inputTopics });
        if (isCreated === false) {
            throw { statusCode: ResponseCode.SomethingWentWrong, status: 'Bad_Request', message: 'Topic_Not_Created' };
        }
        return
    }
    async publishMessage(notificationId: string, notificationType: string, message: any): Promise<void> {
        await this.producer.connect()
        let publishedData = await this.producer.send({ topic: notificationType, messages: [{ key: notificationId, value: JSON.stringify({ message }) }] })
        if (!publishedData) {
            throw { statusCode: ResponseCode.SomethingWentWrong, status: 'Bad_Request', message: 'Producer_Not_Published_Data' };
        }
        return
    }

    async subscribe(topics: string[]): Promise<void> {
        await Promise.all(topics.map((topic: string) => { this.consumer.subscribe({ topic, fromBeginning: true }) }))
    }

    async readMessagesFromTopics(callback: (data: MessageFromEvent) => void) {
        await this.consumer.run({
            eachMessage: async ({ topic, message }: EachMessagePayload) => {
                console.log(' ... .. #### Read Messages From Topics #### .. ... ');
                const _id = message.key.toString();
                const data = JSON.parse(message.value.toString());
                callback({ _id, data, provider: this.providerName, topic });
            },
        })
    }

    contains(exsistingToics, inputTopicsArry) {
        let counter = 0
        for (var i = 0; i < inputTopicsArry.length; i++) {
            if (exsistingToics.includes(inputTopicsArry[i])) counter++
        }
        if (counter === inputTopicsArry.length) return true
        return false
    }
}