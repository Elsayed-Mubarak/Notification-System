export default interface ISendNotification {
    send(data)
    sendOne(data)
    sendGroup(data)
    getRateLimterObject(max, duration)
}