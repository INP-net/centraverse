import { loadQuery } from '$lib/zeus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, parent }) =>
  loadQuery(
    {
      orders: [
        {
          groupUid: params.uid,
        },
        {
          id: true,
          quantity: true,
          paid: true,
          totalPrice: true,
          paymentMethod: true,
          shopItem: {
            id: true,
            name: true,
            price: true,
            description: true,
            paymentMethods: true,
            visibility: true,
            group: { uid: true },
            pictures: {
              path: true,
            },
          },
        },
      ],
    },
    { fetch, parent },
  );
