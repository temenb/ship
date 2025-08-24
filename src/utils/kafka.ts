import {Kafka, ProducerRecord, EachMessagePayload, Partitioners, Admin} from 'kafkajs';
import config from '../config/config'

let producer: ReturnType<Kafka['producer']>;
let consumer: ReturnType<Kafka['consumer']>;
let admin: Admin;

export async function initKafka(clientId: string, groupId = 'default-group') {
  const brokers = config.kafkaBrokers?.split(',');

  const kafka = new Kafka({
    clientId: config.kafkaClientId,
    brokers,
    retry: {
      retries: 5,
      initialRetryTime: 300,
    },
    requestTimeout: 3000,
  });

  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });
  consumer = kafka.consumer({ groupId });
  admin = kafka.admin();

  await producer.connect();
  await consumer.connect();
  await admin.connect();
}

export async function broadcastEvent(topic: string, messages: ProducerRecord['messages']) {
  if (!producer) throw new Error('Kafka producer not initialized');
  await producer.send({ topic, messages });
}


export async function ensureTopic(topic: string) {
  await admin.connect()
  const topics = await admin.listTopics()
  if (!topics.includes(topic)) {
    await admin.createTopics({
      topics: [{ topic, numPartitions: 1, replicationFactor: 1 }]
    })
    console.log(`✅ Created topic: ${topic}`)
  }
  await admin.disconnect()
}

export async function consumeEvent(
  topic: string,
  handler: (payload: EachMessagePayload) => Promise<void>
) {
  if (!consumer) throw new Error('Kafka consumer not initialized');
  await ensureTopic(topic)
  await consumer.subscribe({topic, fromBeginning: true});
  await consumer.run({eachMessage: handler});
}

