export default {
    dbURI: process.env.MONGO_URI + process.env.MONGO_REWRITE,
    ORIGIN_CORS: process.env.ORIGIN_CORS.split(","),
    RedisHost: process.env.RedisHost,
    RedisPort: process.env.RedisPort,
    "timeZone": "Africa/Cairo",
}