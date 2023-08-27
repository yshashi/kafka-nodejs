import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'test-client',
    brokers: ["192.168.1.4:9092"]
});

export default kafka;