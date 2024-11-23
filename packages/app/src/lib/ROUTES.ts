/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
  '/': `/`,
  '/[uid=uid]': (
    uid: Parameters<typeof import('../params/uid.ts').match>[0],
    params?: {
      tab?:
        | 'infos'
        | 'members'
        | 'family'
        | 'see-also'
        | 'groups'
        | 'services'
        | 'majors'
        | 'subjects'
        | 'boards';
    },
  ) => {
    params = params ?? {};
    params.tab = params.tab ?? 'infos';
    return `/${uid}${appendSp({ tab: params.tab })}`;
  },
  '/[uid=uid]/[...page]': (params: {
    uid: Parameters<typeof import('../params/uid.ts').match>[0];
    page: (string | number)[];
  }) => {
    return `/${params.uid}/${params.page?.join('/')}`;
  },
  '/announcements': `/announcements`,
  '/announcements/[id]/edit': (id: string | number, params?: {}) => {
    return `/announcements/${id}/edit`;
  },
  '/announcements/create': `/announcements/create`,
  '/backrooms': `/backrooms`,
  '/birthdays': `/birthdays`,
  '/bookings': `/bookings`,
  '/bookings/[code]': (code: string | number, params?: {}) => {
    return `/bookings/${code}`;
  },
  '/changelog': `/changelog`,
  '/claim-code': `/claim-code`,
  '/claim-code/[code]': (code: string | number, params?: {}) => {
    return `/claim-code/${code}`;
  },
  '/credits': `/credits`,
  '/delete-account': `/delete-account`,
  '/documents': `/documents`,
  '/documents/[major]': (major: string | number, params?: {}) => {
    return `/documents/${major}`;
  },
  '/documents/[major]/[yearTier=display_year_tier]': (params: {
    major: string | number;
    yearTier: Parameters<typeof import('../params/display_year_tier.ts').match>[0];
  }) => {
    return `/documents/${params.major}/${params.yearTier}`;
  },
  '/documents/[major]/[yearTier=display_year_tier]/[subject]': (params: {
    major: string | number;
    yearTier: Parameters<typeof import('../params/display_year_tier.ts').match>[0];
    subject: string | number;
  }) => {
    return `/documents/${params.major}/${params.yearTier}/${params.subject}`;
  },
  '/documents/[major]/[yearTier=display_year_tier]/[subject]/[document]': (params: {
    major: string | number;
    yearTier: Parameters<typeof import('../params/display_year_tier.ts').match>[0];
    subject: string | number;
    document: string | number;
  }) => {
    return `/documents/${params.major}/${params.yearTier}/${params.subject}/${params.document}`;
  },
  '/documents/[major]/[yearTier=display_year_tier]/[subject]/[document]/edit': (params: {
    major: string | number;
    yearTier: Parameters<typeof import('../params/display_year_tier.ts').match>[0];
    subject: string | number;
    document: string | number;
  }) => {
    return `/documents/${params.major}/${params.yearTier}/${params.subject}/${params.document}/edit`;
  },
  '/documents/[major]/[yearTier=display_year_tier]/[subject]/create': (params: {
    major: string | number;
    yearTier: Parameters<typeof import('../params/display_year_tier.ts').match>[0];
    subject: string | number;
  }) => {
    return `/documents/${params.major}/${params.yearTier}/${params.subject}/create`;
  },
  '/documents/create': `/documents/create`,
  '/events': (params?: { week?: Parameters<typeof import('../params/date.ts').match>[0] }) => {
    return `/events${params?.week ? `/${params?.week}` : ''}`;
  },
  '/events/[id]': (id: string | number, params?: {}) => {
    return `/events/${id}`;
  },
  '/events/[id]/bookings': (
    id: string | number,
    params?: { tab?: 'unpaid' | 'paid' | 'verified' },
  ) => {
    params = params ?? {};
    params.tab = params.tab ?? 'unpaid';
    return `/events/${id}/bookings${appendSp({ tab: params.tab })}`;
  },
  '/events/[id]/edit': (id: string | number, params?: {}) => {
    return `/events/${id}/edit`;
  },
  '/events/[id]/edit/banned': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/banned`;
  },
  '/events/[id]/edit/contact': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/contact`;
  },
  '/events/[id]/edit/description': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/description`;
  },
  '/events/[id]/edit/image': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/image`;
  },
  '/events/[id]/edit/links': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/links`;
  },
  '/events/[id]/edit/managers': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/managers`;
  },
  '/events/[id]/edit/recurrence': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/recurrence`;
  },
  '/events/[id]/edit/ticket-groups/[group]': (params: {
    id: string | number;
    group: string | number;
  }) => {
    return `/events/${params.id}/edit/ticket-groups/${params.group}`;
  },
  '/events/[id]/edit/tickets': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/tickets`;
  },
  '/events/[id]/edit/tickets/[ticket]': (params: {
    id: string | number;
    ticket: string | number;
  }) => {
    return `/events/${params.id}/edit/tickets/${params.ticket}`;
  },
  '/events/[id]/edit/tickets/[ticket]/counting': (params: {
    id: string | number;
    ticket: string | number;
  }) => {
    return `/events/${params.id}/edit/tickets/${params.ticket}/counting`;
  },
  '/events/[id]/edit/tickets/[ticket]/group': (params: {
    id: string | number;
    ticket: string | number;
  }) => {
    return `/events/${params.id}/edit/tickets/${params.ticket}/group`;
  },
  '/events/[id]/edit/tickets/[ticket]/links': (params: {
    id: string | number;
    ticket: string | number;
  }) => {
    return `/events/${params.id}/edit/tickets/${params.ticket}/links`;
  },
  '/events/[id]/edit/tickets/[ticket]/payment': (params: {
    id: string | number;
    ticket: string | number;
  }) => {
    return `/events/${params.id}/edit/tickets/${params.ticket}/payment`;
  },
  '/events/[id]/edit/visibility': (id: string | number, params?: {}) => {
    return `/events/${id}/edit/visibility`;
  },
  '/events/[id]/scan': (id: string | number, params?: {}) => {
    return `/events/${id}/scan`;
  },
  '/groups/[uid]/edit': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/edit`;
  },
  '/groups/[uid]/edit/bank-accounts': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/edit/bank-accounts`;
  },
  '/groups/[uid]/edit/bio': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/edit/bio`;
  },
  '/groups/[uid]/edit/links': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/edit/links`;
  },
  '/groups/[uid]/edit/members/bulk': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/edit/members/bulk`;
  },
  '/groups/[uid]/edit/pages': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/edit/pages`;
  },
  '/groups/[uid]/edit/pages/[...page]': (params: {
    uid: string | number;
    page: (string | number)[];
  }) => {
    return `/groups/${params.uid}/edit/pages/${params.page?.join('/')}`;
  },
  '/groups/[uid]/edit/type': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/edit/type`;
  },
  '/groups/[uid]/members': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/members`;
  },
  '/help': `/help`,
  '/login': (params?: { bypass_oauth?: undefined | '1' }) => {
    params = params ?? {};
    params.bypass_oauth = params.bypass_oauth ?? undefined;
    return `/login${appendSp({ bypass_oauth: params.bypass_oauth })}`;
  },
  '/login/done': `/login/done`,
  '/login/forgotten': `/login/forgotten`,
  '/login/reset/[token]': (token: string | number, params?: {}) => {
    return `/login/reset/${token}`;
  },
  '/logout': (params?: { userWasDeleted?: true | undefined }) => {
    params = params ?? {};
    params.userWasDeleted = params.userWasDeleted ?? undefined;
    return `/logout${appendSp({ userWasDeleted: params.userWasDeleted })}`;
  },
  '/logs': `/logs`,
  '/notifications': `/notifications`,
  '/posts/[id]': (id: string | number, params?: {}) => {
    return `/posts/${id}`;
  },
  '/posts/[id]/edit': (id: string | number, params?: {}) => {
    return `/posts/${id}/edit`;
  },
  '/posts/[id]/edit/body': (id: string | number, params?: {}) => {
    return `/posts/${id}/edit/body`;
  },
  '/posts/[id]/edit/event': (id: string | number, params?: {}) => {
    return `/posts/${id}/edit/event`;
  },
  '/posts/[id]/edit/links': (id: string | number, params?: {}) => {
    return `/posts/${id}/edit/links`;
  },
  '/posts/[id]/edit/picture': (id: string | number, params?: {}) => {
    return `/posts/${id}/edit/picture`;
  },
  '/posts/[id]/edit/visibility': (id: string | number, params?: {}) => {
    return `/posts/${id}/edit/visibility`;
  },
  '/quick-signups/create': `/quick-signups/create`,
  '/quick-signups/manage': `/quick-signups/manage`,
  '/quick-signups/qr/[code]': (code: string | number, params?: {}) => {
    return `/quick-signups/qr/${code}`;
  },
  '/reports': `/reports`,
  '/reports/[number]': (number: string | number, params?: {}) => {
    return `/reports/${number}`;
  },
  '/search': (params?: { q?: string | number }) => {
    return `/search${params?.q ? `/${params?.q}` : ''}`;
  },
  '/services': `/services`,
  '/services/[id]/edit': (id: string | number, params?: {}) => {
    return `/services/${id}/edit`;
  },
  '/services/manage': `/services/manage`,
  '/services/submit': `/services/submit`,
  '/set-password': `/set-password`,
  '/settings': `/settings`,
  '/signups': `/signups`,
  '/signups/edit/[email]': (email: string | number, params?: {}) => {
    return `/signups/edit/${email}`;
  },
  '/student-associations/[uid]/[...page]': (params: {
    uid: string | number;
    page: (string | number)[];
  }) => {
    return `/student-associations/${params.uid}/${params.page?.join('/')}`;
  },
  '/student-associations/[uid]/edit/pages': (uid: string | number, params?: {}) => {
    return `/student-associations/${uid}/edit/pages`;
  },
  '/student-associations/[uid]/edit/pages/[...page]': (params: {
    uid: string | number;
    page: (string | number)[];
  }) => {
    return `/student-associations/${params.uid}/edit/pages/${params.page?.join('/')}`;
  },
  '/users/[uid]/edit': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit`;
  },
  '/users/[uid]/edit/bio': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/bio`;
  },
  '/users/[uid]/edit/contributions': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/contributions`;
  },
  '/users/[uid]/edit/curriculum': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/curriculum`;
  },
  '/users/[uid]/edit/email': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/email`;
  },
  '/users/[uid]/edit/family': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/family`;
  },
  '/users/[uid]/edit/links': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/links`;
  },
  '/users/[uid]/edit/name': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/name`;
  },
  '/users/[uid]/edit/other-emails': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/other-emails`;
  },
  '/users/[uid]/edit/permissions': (uid: string | number, params?: {}) => {
    return `/users/${uid}/edit/permissions`;
  },
  '/validate-email/[token]': (token: string | number, params?: {}) => {
    return `/validate-email/${token}`;
  },
  '/welcome': `/welcome`,
  '/connect/google/callback': `/connect/google/callback`,
  '/kiosk': `/kiosk`,
  '/_component/[...componentName]': (componentName: (string | number)[], params?: {}) => {
    return `/_component/${componentName?.join('/')}`;
  },
  '/signup': `/signup`,
  '/signup/[qrcode]': (qrcode: string | number, params?: {}) => {
    return `/signup/${qrcode}`;
  },
  '/signup/finish/[token]': (token: string | number, params?: {}) => {
    return `/signup/finish/${token}`;
  },
};

/**
 * SERVERS
 */
const SERVERS = {
  'GET /[entity=entity_handle]': (
    entity: Parameters<typeof import('../params/entity_handle.ts').match>[0],
    params?: {},
  ) => {
    return `/${entity}`;
  },
  'GET /[uid=uid].png': (
    uid: Parameters<typeof import('../params/uid.ts').match>[0],
    params?: {},
  ) => {
    return `/${uid}.png`;
  },
  'GET /bookings/[code].pdf': (code: string | number, params?: {}) => {
    return `/bookings/${code}.pdf`;
  },
  'GET /events/[id]/bookings.csv': (id: string | number, params?: {}) => {
    return `/events/${id}/bookings.csv`;
  },
  'GET /frappe': `/frappe`,
  'GET /groups/[uid]': (uid: string | number, params?: {}) => {
    return `/groups/${uid}`;
  },
  'GET /groups/[uid].pdf': (uid: string | number, params?: {}) => {
    return `/groups/${uid}.pdf`;
  },
  'GET /groups/[uid]/[...page]': (params: { uid: string | number; page: (string | number)[] }) => {
    return `/groups/${params.uid}/${params.page?.join('/')}`;
  },
  'GET /groups/[uid]/handover.pdf': (uid: string | number, params?: {}) => {
    return `/groups/${uid}/handover.pdf`;
  },
  'GET /help/prefilled-links': `/help/prefilled-links`,
  'GET /me': `/me`,
  'GET /schools/[uid]': (uid: string | number, params?: {}) => {
    return `/schools/${uid}`;
  },
  'GET /student-associations/[uid]': (uid: string | number, params?: {}) => {
    return `/student-associations/${uid}`;
  },
  'GET /themes.css': `/themes.css`,
  'GET /users/[uid]': (uid: string | number, params?: {}) => {
    return `/users/${uid}`;
  },
  'GET /connect/google': `/connect/google`,
  'GET /health': `/health`,
  '_RESERVED_USERNAMES /check-uid/[uid]': (uid: string | number, params?: {}) => {
    return `/check-uid/${uid}`;
  },
  'GET /check-uid/[uid]': (uid: string | number, params?: {}) => {
    return `/check-uid/${uid}`;
  },
  'GET /gdpr': `/gdpr`,
  'GET /manifest.json': `/manifest.json`,
  'POST /markdown': `/markdown`,
};

/**
 * ACTIONS
 */
const ACTIONS = {
  'default /login': `/login`,
};

/**
 * LINKS
 */
const LINKS = {};

type ParamValue = string | number | undefined;

/**
 * Append search params to a string
 */
export const appendSp = (
  sp?: Record<string, ParamValue | ParamValue[]>,
  prefix: '?' | '&' = '?',
) => {
  if (sp === undefined) return '';

  const params = new URLSearchParams();
  const append = (n: string, v: ParamValue) => {
    if (v !== undefined) {
      params.append(n, String(v));
    }
  };

  for (const [name, val] of Object.entries(sp)) {
    if (Array.isArray(val)) {
      for (const v of val) {
        append(name, v);
      }
    } else {
      append(name, val);
    }
  }

  const formatted = params.toString();
  if (formatted) {
    return `${prefix}${formatted}`;
  }
  return '';
};

/**
 * get the current search params
 *
 * Could be use like this:
 * ```
 * route("/cities", { page: 2 }, { ...currentSP() })
 * ```
 */
export const currentSp = () => {
  const params = new URLSearchParams(window.location.search);
  const record: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    record[key] = value;
  }
  return record;
};

// route function helpers
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS };
type AllTypes = typeof AllObjs;

export type Routes = keyof AllTypes extends `${string}/${infer Route}`
  ? `/${Route}`
  : keyof AllTypes;
export const routes = [
  ...new Set(Object.keys(AllObjs).map((route) => /^\/.*|[^ ]?\/.*$/.exec(route)?.[0] ?? route)),
] as Routes[];

/**
 * To be used like this:
 * ```ts
 * import { route } from './ROUTES'
 *
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(
  key: T,
  ...params: FunctionParams<AllTypes[T]>
): string;
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string;
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
  if ((AllObjs[key] as any) instanceof Function) {
    const element = (AllObjs as any)[key] as (...args: any[]) => string;
    return element(...params);
  } else {
    return AllObjs[key] as string;
  }
}

/**
 * Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
 *
 * Full example:
 * ```ts
 * import type { KIT_ROUTES } from './ROUTES'
 * import { kitRoutes } from 'vite-plugin-kit-routes'
 *
 * kitRoutes<KIT_ROUTES>({
 *  PAGES: {
 *    // here, key of object will be typed!
 *  }
 * })
 * ```
 */
export type KIT_ROUTES = {
  PAGES: {
    '/': never;
    '/[uid=uid]': 'uid';
    '/[uid=uid]/[...page]': 'uid' | 'page';
    '/announcements': never;
    '/announcements/[id]/edit': 'id';
    '/announcements/create': never;
    '/backrooms': never;
    '/birthdays': never;
    '/bookings': never;
    '/bookings/[code]': 'code';
    '/changelog': never;
    '/claim-code': never;
    '/claim-code/[code]': 'code';
    '/credits': never;
    '/delete-account': never;
    '/documents': never;
    '/documents/[major]': 'major';
    '/documents/[major]/[yearTier=display_year_tier]': 'major' | 'yearTier';
    '/documents/[major]/[yearTier=display_year_tier]/[subject]': 'major' | 'yearTier' | 'subject';
    '/documents/[major]/[yearTier=display_year_tier]/[subject]/[document]':
      | 'major'
      | 'yearTier'
      | 'subject'
      | 'document';
    '/documents/[major]/[yearTier=display_year_tier]/[subject]/[document]/edit':
      | 'major'
      | 'yearTier'
      | 'subject'
      | 'document';
    '/documents/[major]/[yearTier=display_year_tier]/[subject]/create':
      | 'major'
      | 'yearTier'
      | 'subject';
    '/documents/create': never;
    '/events': 'week';
    '/events/[id]': 'id';
    '/events/[id]/bookings': 'id';
    '/events/[id]/edit': 'id';
    '/events/[id]/edit/banned': 'id';
    '/events/[id]/edit/contact': 'id';
    '/events/[id]/edit/description': 'id';
    '/events/[id]/edit/image': 'id';
    '/events/[id]/edit/links': 'id';
    '/events/[id]/edit/managers': 'id';
    '/events/[id]/edit/recurrence': 'id';
    '/events/[id]/edit/ticket-groups/[group]': 'id' | 'group';
    '/events/[id]/edit/tickets': 'id';
    '/events/[id]/edit/tickets/[ticket]': 'id' | 'ticket';
    '/events/[id]/edit/tickets/[ticket]/counting': 'id' | 'ticket';
    '/events/[id]/edit/tickets/[ticket]/group': 'id' | 'ticket';
    '/events/[id]/edit/tickets/[ticket]/links': 'id' | 'ticket';
    '/events/[id]/edit/tickets/[ticket]/payment': 'id' | 'ticket';
    '/events/[id]/edit/visibility': 'id';
    '/events/[id]/scan': 'id';
    '/groups/[uid]/edit': 'uid';
    '/groups/[uid]/edit/bank-accounts': 'uid';
    '/groups/[uid]/edit/bio': 'uid';
    '/groups/[uid]/edit/links': 'uid';
    '/groups/[uid]/edit/members/bulk': 'uid';
    '/groups/[uid]/edit/pages': 'uid';
    '/groups/[uid]/edit/pages/[...page]': 'uid' | 'page';
    '/groups/[uid]/edit/type': 'uid';
    '/groups/[uid]/members': 'uid';
    '/help': never;
    '/login': never;
    '/login/done': never;
    '/login/forgotten': never;
    '/login/reset/[token]': 'token';
    '/logout': never;
    '/logs': never;
    '/notifications': never;
    '/posts/[id]': 'id';
    '/posts/[id]/edit': 'id';
    '/posts/[id]/edit/body': 'id';
    '/posts/[id]/edit/event': 'id';
    '/posts/[id]/edit/links': 'id';
    '/posts/[id]/edit/picture': 'id';
    '/posts/[id]/edit/visibility': 'id';
    '/quick-signups/create': never;
    '/quick-signups/manage': never;
    '/quick-signups/qr/[code]': 'code';
    '/reports': never;
    '/reports/[number]': 'number';
    '/search': 'q';
    '/services': never;
    '/services/[id]/edit': 'id';
    '/services/manage': never;
    '/services/submit': never;
    '/set-password': never;
    '/settings': never;
    '/signups': never;
    '/signups/edit/[email]': 'email';
    '/student-associations/[uid]/[...page]': 'uid' | 'page';
    '/student-associations/[uid]/edit/pages': 'uid';
    '/student-associations/[uid]/edit/pages/[...page]': 'uid' | 'page';
    '/users/[uid]/edit': 'uid';
    '/users/[uid]/edit/bio': 'uid';
    '/users/[uid]/edit/contributions': 'uid';
    '/users/[uid]/edit/curriculum': 'uid';
    '/users/[uid]/edit/email': 'uid';
    '/users/[uid]/edit/family': 'uid';
    '/users/[uid]/edit/links': 'uid';
    '/users/[uid]/edit/name': 'uid';
    '/users/[uid]/edit/other-emails': 'uid';
    '/users/[uid]/edit/permissions': 'uid';
    '/validate-email/[token]': 'token';
    '/welcome': never;
    '/connect/google/callback': never;
    '/kiosk': never;
    '/_component/[...componentName]': 'componentName';
    '/signup': never;
    '/signup/[qrcode]': 'qrcode';
    '/signup/finish/[token]': 'token';
  };
  SERVERS: {
    'GET /[entity=entity_handle]': 'entity';
    'GET /[uid=uid].png': 'uid';
    'GET /bookings/[code].pdf': 'code';
    'GET /events/[id]/bookings.csv': 'id';
    'GET /frappe': never;
    'GET /groups/[uid]': 'uid';
    'GET /groups/[uid].pdf': 'uid';
    'GET /groups/[uid]/[...page]': 'uid' | 'page';
    'GET /groups/[uid]/handover.pdf': 'uid';
    'GET /help/prefilled-links': never;
    'GET /me': never;
    'GET /schools/[uid]': 'uid';
    'GET /student-associations/[uid]': 'uid';
    'GET /themes.css': never;
    'GET /users/[uid]': 'uid';
    'GET /connect/google': never;
    'GET /health': never;
    '_RESERVED_USERNAMES /check-uid/[uid]': 'uid';
    'GET /check-uid/[uid]': 'uid';
    'GET /gdpr': never;
    'GET /manifest.json': never;
    'POST /markdown': never;
  };
  ACTIONS: { 'default /login': never };
  LINKS: Record<string, never>;
  Params: {
    uid: never;
    tab: never;
    page: never;
    id: never;
    code: never;
    major: never;
    yearTier: never;
    subject: never;
    document: never;
    week: never;
    group: never;
    ticket: never;
    bypass_oauth: never;
    token: never;
    userWasDeleted: never;
    number: never;
    q: never;
    email: never;
    componentName: never;
    qrcode: never;
    entity: never;
  };
};
