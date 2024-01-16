import { CURRENT_VERSION } from '$lib/buildinfo.js';
import { _suscribeWithToken } from '$lib/subscriptions';
import { loadQuery } from '$lib/zeus';
import WebSocket from 'ws';

function PromiseWithTimeout<T>(
  timeout: number,
  callback: (resolve: (value: T) => void, reject: (error: Error) => void) => void,
): Promise<T> {
  return new Promise((resolve, reject) => {
    // Set up the timeout
    const timer = setTimeout(() => {
      reject(new Error(`Promise timed out after ${timeout} ms`));
    }, timeout);

    // Set up the real work
    callback(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function vibeCheckDatWebsocket() {
  return PromiseWithTimeout(4000, (resolve) => {
    let ok = false;
    _suscribeWithToken(undefined, WebSocket)(
      {
        announcementsNow: {
          __typename: true,
        },
      },
      async (eventData) => {
        try {
          const freshData = await eventData;
          if ('errors' in freshData) return;
          if (!freshData.announcementsNow) return;
          ok = Array.isArray(freshData.announcementsNow);
          resolve(ok);
        } catch {
          resolve(false);
        }
      },
    );
  });
}

function deepFlatten(
  o: Record<string, boolean | Record<string, unknown>>,
): Record<string, boolean> {
  return Object.fromEntries(
    Object.entries(o).flatMap(([k, v]) =>
      typeof v === 'boolean'
        ? [[k, v]]
        : Object.entries(deepFlatten(v as Record<string, boolean>)).map(([k2, v2]) => [
            k2 ? `${k}_${k2}` : k,
            v2,
          ]),
    ),
  );
}

export async function GET({ fetch }) {
  const { healthcheck } = await loadQuery(
    {
      healthcheck: {
        database: { prisma: true },
        ldap: { internal: true, school: true },
        mail: { smtp: true },
        redis: { publish: true, subscribe: true },
      },
    },
    { fetch },
  )
    .then((checks) => {
      return {
        healthcheck: {
          '': true,
          ...checks.healthcheck,
        },
      };
    })
    .catch(() => {
      return {
        healthcheck: {
          '': false,
          'database': { prisma: false },
          'ldap': { internal: false, school: false },
          'mail': { smtp: false },
          'redis': { publish: false, subscribe: false },
        },
      };
    });

  const checks = {
    app: true,
    websocket: await vibeCheckDatWebsocket().catch(() => false),
    ...deepFlatten({
      api: healthcheck,
    }),
  };

  return new Response(
    JSON.stringify({
      version: CURRENT_VERSION,
      checks,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      status: Object.values(checks).every(Boolean) ? 200 : 500,
    },
  );
}
