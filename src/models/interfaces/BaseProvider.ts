export interface BaseProvider {
    readonly providerName: string
    subscribe(topics: string[]): Promise<void>
    readMessagesFromTopics(callback: (data: MessageFromEvent) => void)
}

export interface MessageFromEvent {
    _id: string
    data: string
    topic: string
    provider: string
}

export interface KafkaConnectionOptions {
    clientId: string
    brokers: string[]
    groupId: string
}
export interface Topics {
    clientId: string
    brokers: string[]
    groupId: string
}