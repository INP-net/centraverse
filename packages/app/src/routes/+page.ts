import { loadQuery, Selector } from '$lib/zeus';
import type { PageLoad } from './$types';

export const _pageQuery = Selector('QueryHomepageConnection')({
  pageInfo: { hasNextPage: true, endCursor: true },
  edges: {
    cursor: true,
    node: {
      id: true,
      uid: true,
      title: true,
      bodyHtml: true,
      bodyPreview: true,
      body: true,
      visibility: true,
      publishedAt: true,
      pictureFile: true,
      group: { uid: true, name: true, pictureFile: true, pictureFileDark: true },
      author: { uid: true, firstName: true, lastName: true, fullName: true },
      links: { value: true, computedValue: true, name: true },
    },
  },
});

export const load: PageLoad = async ({ fetch, parent }) => {
  const { me } = await parent();
  const { homepage } = await loadQuery({ homepage: [{}, _pageQuery] }, { fetch, parent });
  if (me) {
    const { birthdays } = await loadQuery(
      {
        birthdays: [
          { activeOnly: true, width: 0 },
          {
            fullName: true,
            pictureFile: true,
            uid: true,
            birthday: true,
            yearTier: true,
            major: { name: true, shortName: true, schools: { uid: true } },
          },
        ],
      },
      { fetch, parent },
    );
    return { homepage, birthdays };
  }

  return { homepage, birthdays: undefined };
};
