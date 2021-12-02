import IORedis from 'ioredis';
import Config from './index'

const redis = new IORedis({
    port: Config.RedisPort,
    host: Config.RedisHost || "localhost"
});

export default redis;