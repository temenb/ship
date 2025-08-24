import {consumeEvent} from "./kafka";
import config from "../config/config";
import {upsertProfile} from "../services/profile.service";
import logger from "./logger";

export async function initConsumers() {
  await consumeEvent(config.kafkaTopicUserCreated, async ({topic, partition, message}): Promise<void> => {
    try {
      const rawValue = message.value?.toString();
      if (!rawValue) {
        console.warn(`[Kafka] Empty message on topic=${topic}, partition=${partition}`);
        return;
      }

      const payload = JSON.parse(rawValue);
      console.log(`[Kafka] Message consumed`, {
        topic,
        partition,
        offset: message.offset,
        payload,
      });

      const profile = await upsertProfile(payload.ownerId);
      logger.log(`[${topic}] Processed ownerId=${payload.ownerId}`);
      logger.log(`[Profile service] Profile ${profile.id} created`);

      // Здесь можно добавить бизнес-логику обработки payload
    } catch (error) {
      console.error(`[Kafka] Failed to process message`, {
        topic,
        partition,
        offset: message.offset,
        error,
      });
    }
  });
}

export default initConsumers;
