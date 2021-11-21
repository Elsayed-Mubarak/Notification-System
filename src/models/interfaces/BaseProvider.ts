export interface BaseProvider {
    readonly providerName: string
    subscribe(topics: string[]): Promise<void>
    readMessagesFromTopics(callback: (data: MessageFromEvent) => void)
}

export interface MessageFromEvent {
    data: Record<string, unknown>
    topic: string
    provider: string
}

export interface KafkaConnectionOptions {
    clientId: string
    brokers: string[]
    groupId: string
}