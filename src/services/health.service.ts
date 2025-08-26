import prisma from '../utils/prisma';
import logger from '@shared/logger';
import kafkaConfig from '../utils/kafka.config';
import { createProducer, createConsumer } from '@shared/kafka';

const startedAt = Date.now();

export const health = async () => {
  const [pgOk, kafkaOk] = await Promise.all([
    checkPostgres(),
    checkKafka(),
  ]);

  return {
    healthy: pgOk && kafkaOk,
    components: {
      postgres: pgOk ? 'ok' : 'fail',
      kafka: kafkaOk ? 'ok' : 'fail',
    },
  };
};

export const status = async () => {
  return {
    name: 'auth',
    version: process.env.BUILD_VERSION || 'dev',
    env: process.env.NODE_ENV || 'development',
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  };
};

export const livez = async () => {
  return {
    live: true,
  };
};

export const readyz = async () => {
  const [pgOk, kafkaOk] = await Promise.all([
    checkPostgres(),
    checkKafka(),
  ]);

  return {ready: pgOk && kafkaOk};
};

export const checkPostgres = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (err) {
    logger.error('❌ Prisma/Postgres health check failed:', err);
    return false;
  }
};

export const checkKafka = async (): Promise<boolean> => {
  try {
    const producer = await createProducer(kafkaConfig);
    await producer.send({ topic: 'healthcheck' }, { value: 'ping' });
    return true;
  } catch (err) {
    logger.error('❌ Kafka health check failed:', err);
    return false;
  }
};
