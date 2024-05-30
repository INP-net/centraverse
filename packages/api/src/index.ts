import { GOOGLE_WALLET_CLASS, registerGoogleWalletClass } from './lib/google-wallet.js';
import { writeSchema } from './schema.js';
import { startApiServer } from './server/express.js';
import { lydiaWebhook } from './server/lydia.js';
import { maintenance } from './server/maintenance.js';
import { rescheduleNotifications } from './server/notifications-rescheduler.js';
import { prometheusServer } from './server/prometheus.js';

startApiServer();

lydiaWebhook.listen(4001, () => {
  console.info('Webhook ready at http://localhost:4001');
});

maintenance.listen(4002, () => {
  console.info('Maintenance page server listening at http://localhost:4002');
});

prometheusServer.listen(9999, () => {
  console.info('Prometheus metrics server listening on port 9999');
});

await writeSchema();
await rescheduleNotifications({ dryRun: true });
const id = await registerGoogleWalletClass(GOOGLE_WALLET_CLASS);
if (id) console.info(`Registered Google Wallet pass class ${id}`);
