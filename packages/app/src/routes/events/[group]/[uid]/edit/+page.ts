import { Selector, loadQuery } from '$lib/zeus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent, params }) =>
  loadQuery(
    {
      groups: [{}, Selector('Group')({ uid: true, id: true, name: true, pictureFile: true })],
      event: [
        {
          groupUid: params.group,
          uid: params.uid,
        },
        Selector('Event')({
          id: true,
          startsAt: true,
          endsAt: true,
          pictureFile: true,
          description: true,
          group: {
            id: true,
            uid: true,
            name: true,
            pictureFile: true,
          },
          tickets: {
            id: true,
            name: true,
            description: true,
            price: true,
            capacity: true,
            opensAt: true,
            closesAt: true,
            autojoinGroups: {
              uid: true,
              name: true,
              pictureFile: true,
            },
            links: {
              value: true,
              name: true,
            },
            allowedPaymentMethods: true,
            openToPromotions: true,
            openToExternal: true,
            openToAlumni: true,
            openToSchools: {
              uid: true,
              name: true,
              color: true,
            },
            openToMajors: {
              shortName: true,
              name: true,
              id: true,
            },
            openToGroups: {
              uid: true,
              name: true,
              pictureFile: true,
            },
            openToContributors: true,
            godsonLimit: true,
            onlyManagersCanProvide: true,
          },
          ticketGroups: {
            id: true,
            name: true,
            capacity: true,
            tickets: {
              id: true,
              name: true,
              description: true,
              price: true,
              capacity: true,
              opensAt: true,
              closesAt: true,
              links: {
                value: true,
                name: true,
              },
              allowedPaymentMethods: true,
              openToPromotions: true,
              openToAlumni: true,
              openToSchools: {
                name: true,
                uid: true,
                color: true,
              },
              openToMajors: {
                shortName: true,
                name: true,
                id: true,
              },
              openToGroups: {
                uid: true,
                name: true,
                pictureFile: true,
              },
              openToContributors: true,
              godsonLimit: true,
              onlyManagersCanProvide: true,
            },
          },
          contactMail: true,
          beneficiary: {
            id: true,
            name: true,
          },
          links: {
            value: true,
            name: true,
          },
          location: true,
          uid: true,
          title: true,
          visibility: true,
          managers: {
            user: {
              uid: true,
              firstName: true,
              lastName: true,
              fullName: true,
              pictureFile: true,
            },
            canEdit: true,
            canEditPermissions: true,
            canVerifyRegistrations: true,
          },
        }),
      ],
    },
    { fetch, parent }
  );
