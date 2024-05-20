import { builder, updateRateLimitHit, type Context } from '#lib';
import { printSchema } from 'graphql';
import {
  defaultKeyGenerator,
  defaultOnLimit,
  rateLimitDirective,
} from 'graphql-rate-limit-directive';
import { writeFile } from 'node:fs/promises';

import '#modules/announcements';
import '#modules/bar-weeks';
import '#modules/changelogs';
import '#modules/comments';
import '#modules/curriculum';
import '#modules/documents';
import '#modules/events';
import '#modules/forms';
import '#modules/gitlab';
import '#modules/global';
import '#modules/groups';
import '#modules/health-checks';
import '#modules/links';
import '#modules/logs';
import '#modules/mails';
import '#modules/notifications';
import '#modules/oauth';
import '#modules/payments';
import '#modules/posts';
import '#modules/reactions';
import '#modules/schools';
import '#modules/services';
import '#modules/shop';
import '#modules/student-associations';
import '#modules/ticketing';
import '#modules/users';

const { rateLimitDirectiveTransformer } = rateLimitDirective({
  keyGenerator: (dargs, src, args, ctx: Context, info) => {
    return `${ctx.user?.uid}:${defaultKeyGenerator(dargs, src, args, ctx, info)}`;
  },
  onLimit(response, dargs, src, args, ctx, info) {
    updateRateLimitHit({
      queryName: info.fieldName,
      queryType: info.parentType.name,
      token: ctx.token,
      user: ctx.user?.id,
      tryAgainInMs: response.msBeforeNext,
    });
    defaultOnLimit(response, dargs, src, args, ctx, info);
  },
});

export const schema = rateLimitDirectiveTransformer(builder.toSchema({}));

export const writeSchema = async () =>
  writeFile(new URL('build/schema.graphql', `file:///${process.cwd()}/`), printSchema(schema));
