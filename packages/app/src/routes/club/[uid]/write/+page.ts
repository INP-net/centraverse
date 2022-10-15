import { redirectToLogin } from '$lib/session';
import { loadQuery } from '$lib/zeus.js';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, parent, url }) => {
  const { me } = await parent();
  if (!me) throw redirectToLogin(url.pathname);

  if (
    !me.canEditGroups &&
    !me.groups.some(({ group, canEditArticles }) => group.uid === params.uid && canEditArticles)
  )
    throw redirect(307, '.');

  return loadQuery({ group: [params, { uid: true, name: true }] }, { fetch, parent });
};
