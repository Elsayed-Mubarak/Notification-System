import { Admin, Consumer, EachMessagePayload, Kafka, Producer } from 'kafkajs'
import { ResponseCode } from '../models/enums/StatusCode';
import { KafkaConnectionOptions, BaseProvider, MessageFromEvent } from '../models/interfaces/BaseProvider'

export class KafkaProvider implements BaseProvider {

    providerName = `KAFKA`;
    private provider: Kafka;
    private producer: Producer;
    private consumer: Consumer
    private admin: Admin;

    constructor(opt: KafkaConnectionOptions) {
        this.provider = new Kafka({
            clientId: opt.clientId,
            brokers: opt.brokers
        });

        this.admin = this.provider.admin();
        this.producer = this.provider.producer();
        this.consumer = this.provider.consumer({ groupId: opt.groupId });
        this.createTopic().then()
    }

    async createTopic() {
        try {
            await this.admin.connect()
            await this.admin.createTopics({
                waitForLeaders: true,
                topics: [
                    { topic: 'SMS' },
                    { topic: 'PUSH_NOTIFICATION' }
                ]
            })
        } catch (err) {
            console.log("ERROR_FROM_KAFKA_CREATE_TOPIC", err);
            throw { statusCode: ResponseCode.SomethingWentWrong, status: 'Bad_Request', message: err };

        }
    }

    async publishMessage(topic: string, message: any): Promise<void> {
        try {
            await this.producer.connect()
            await this.producer.send({
                topic: topic,
                messages: [{ value: JSON.stringify({ message }) }]
            })

        } catch (err) {
            console.log(err, 'error')
            throw { statusCode: ResponseCode.SomethingWentWrong, status: 'Bad_Request', message: err };
        }
    }

    async subscribe(topics: string[]): Promise<void> {
        await Promise.all(
            topics.map((topic: string) => this.consumer.subscribe({ topic, fromBeginning: true }))
        )
    }
    async readMessagesFromTopics(callback: (data: MessageFromEvent) => void) {
        await this.consumer.run({
            eachMessage: async ({ topic, message }: EachMessagePayload) => {
                const data = JSON.parse(message.value.toString()) as unknown as Record<string, unknown>
                callback({ data, provider: this.providerName, topic })
            },
        })
    }

}