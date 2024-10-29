import { connect, StringCodec, type JetStreamManager, type NatsConnection } from 'nats';
import { STREAM_NAME, SUBJECT_NAME } from '../notella/constants.js';
import type { Message } from '../notella/types.js';

let jetstreamManager: JetStreamManager;
let natsConnection: NatsConnection;

export async function queueNotification(message: Message) {
  const nc = await setupNats();
  const js = nc.jetstream();
  const sc = StringCodec();

  await js.publish(SUBJECT_NAME, sc.encode(JSON.stringify(message)));
}

async function setupNats(): Promise<NatsConnection> {
  if (jetstreamManager && natsConnection) return natsConnection;

  // Connect to the NATS server
  const nc = await connect({ servers: 'localhost:4222' });

  // Create a JetStream manager to manage streams
  const jsm = await nc.jetstreamManager();

  // Ensure the stream exists
  await setupStream(jsm, STREAM_NAME, SUBJECT_NAME);
  jetstreamManager = jsm;
  natsConnection = nc;
  return nc;
}

async function setupStream(
  jetStreamManager: JetStreamManager,
  streamName: string,
  subject: string,
) {
  try {
    // Try to add the stream (will not recreate if it exists)
    await jetStreamManager.streams.add({
      name: streamName,
      subjects: [subject],
    });
  } catch (error) {
    console.error(
      `Error setting up stream: ${error && typeof error === 'object' && 'message' in error ? error.message : 'unknown error'}`,
    );
  }
}
