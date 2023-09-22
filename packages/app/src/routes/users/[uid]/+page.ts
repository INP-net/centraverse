import { redirectToLogin } from '$lib/session';
import { byMemberGroupTitleImportance } from '$lib/sorting';
import { loadQuery } from '$lib/zeus';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, parent, url }) => {
  const { me } = await parent();
  if (!me) throw redirectToLogin(url.pathname);
  const data = await loadQuery(
    {
      contributionOptions: {
        name: true,
        price: true,
        id: true,
        paysFor: { name: true, id: true },
      },
      user: [
        params,
        {
          admin: true,
          apprentice: true,
          uid: true,
          address: true,
          birthday: true,
          createdAt: true,
          description: true,
          descriptionHtml: true,
          firstName: true,
          graduationYear: true,
          lastName: true,
          fullName: true,
          nickname: true,
          email: true,
          otherEmails: true,
          phone: true,
          pictureFile: true,
          groups: {
            group: { uid: true, name: true, color: true, pictureFile: true, pictureFileDark: true },
            title: true,
            president: true,
            treasurer: true,
            vicePresident: true,
            secretary: true,
          },
          links: { name: true, value: true, computedValue: true },
          major: {
            name: true,
            shortName: true,
            schools: {
              uid: true,
              name: true,
              color: true,
              studentAssociations: {
                id: true,
                name: true,
              },
            },
          },
          familyTree: {
            nesting: true,
            users: {
              uid: true,
              firstName: true,
              lastName: true,
              fullName: true,
              pictureFile: true,
              graduationYear: true,
            },
          },
          ...(me.uid === params.uid ? { pendingContributions: { name: true, id: true } } : {}),
          ...(me.canEditUsers || me.uid === params.uid
            ? {
                contributesTo: {
                  name: true,
                  id: true,
                },
              }
            : {}),
          articles: [
            {},
            {
              edges: {
                node: {
                  title: true,
                  uid: true,
                  group: { uid: true, name: true, pictureFile: true, pictureFileDark: true },
                  bodyHtml: true,
                  publishedAt: true,
                  links: { value: true, name: true, computedValue: true },
                  visibility: true,
                },
              },
            },
          ],
        },
      ],
    },
    { fetch, parent },
  );

  return {
    ...data,
    user: {
      ...data.user,
      groups: data.user.groups.sort(byMemberGroupTitleImportance),
    },
  };
};
