Message.aggregate(
    [
        { "$match": { "to": user } },
        { "$sort": { "date": 1 } },
        { "$group": { 
            "_id": "from",
            "to": { "$first": "$to" },
            "message": { "$first": "$message" },
            "date": { "$first": "$date" },
            "origId": { "$first": "$_id" }
        }},
        { "$lookup": {
             "from": "users",
             "localField": "from",
             "foreignField": "_id",
             "as": "from"
        }},
        { "$lookup": {
             "from": "users",
             "localField": "to",
             "foreignField": "_id",
             "as": "to"
        }},
        { "$unwind": { "path" : "$from" } },
        { "$unwind": { "path" : "$to" } }
    ],
    function(err,results) {
        if (err) throw err;
        return results;
    }
)



const Product = require('./product');

class ProductRepository {

    constructor() {
        this.products = new Map([
            ["09", new Product("09", "CREDIT_CARD", "Gem Visa", "v1")],
            ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")],
            ["11", new Product("11", "PERSONAL_LOAN", "MyFlexiPay", "v2")],
        ]);
    }

    async fetchAll() {
        return [...this.products.values()]
    }

    async getById(id) {
        return this.products.get(id);
    }

    async insert(product) {
        return this.products.set(product.id, product)
    }
}

module.exports = new ProductRepository()



version: '3.5'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:6.0.1
    hostname: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    networks:
      - pub-sub-net

  broker:
    image: confluentinc/cp-server:6.0.1
    hostname: broker
    container_name: broker
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
      - "9101:9101"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://broker:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_METRIC_REPORTERS: io.confluent.metrics.reporter.ConfluentMetricsReporter
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_CONFLUENT_LICENSE_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_CONFLUENT_BALANCER_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_JMX_PORT: 9101
      KAFKA_JMX_HOSTNAME: localhost
      KAFKA_CONFLUENT_SCHEMA_REGISTRY_URL: http://schema-registry:8081
      CONFLUENT_METRICS_REPORTER_BOOTSTRAP_SERVERS: broker:29092
      CONFLUENT_METRICS_REPORTER_TOPIC_REPLICAS: 1
      CONFLUENT_METRICS_ENABLE: 'true'
      CONFLUENT_SUPPORT_CUSTOMER_ID: 'anonymous'
    networks:
      - pub-sub-net

  redis:
    container_name: realtime-broker-redis
    image: redis:alpine
    networks:
      - pub-sub-net
    ports:
      - "6379:6379"

  confluentinc-pub-sub:
    container_name: confluentinc-pub-sub
    build: .
    environment:
      - NODE_ENV=development
    volumes:
      - ./src:/var/prod/src
    networks:
      - pub-sub-net
    depends_on:
      - broker
      - redis

networks:
  pub-sub-net:
    name: pub-sub-net
    driver: bridge
    