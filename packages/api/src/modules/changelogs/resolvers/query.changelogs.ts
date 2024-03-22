import { builder, CURRENT_VERSION, prisma } from '#lib';
import { SortDirection, SortDirectionEnum } from '#modules/global';
import { resolveArrayConnection } from '@pothos/plugin-relay';
import { GraphQLError } from 'graphql';
import * as SemVer from 'semver';
import { ChangelogReleaseType } from '../types/changelog-release.js';
import { getChangelogsInVersionRange } from '../utils/changelogs.js';

builder.queryField('changelogs', (t) =>
  t.connection({
    type: ChangelogReleaseType,
    description: `A changelog for multiple versions. 
Be careful, this range is (from, to]. I.e. **the first version is excluded, and the last is included**. 
This is way more useful for querying a range of versions for a changelog, but not the usual way ranges are defined.`,
    validate({ from, to }) {
      if (from && to) return SemVer.lte(from, to);
      return true;
    },
    args: {
      sort: t.arg({
        type: SortDirectionEnum,
        defaultValue: SortDirection.Ascending,
      }),
      from: t.arg.string({
        required: false,
        description:
          'The version to start from, **exclusive**. Leave empty to start from the latest version the user has seen',
        validate: {
          refine: (value) => Boolean(SemVer.valid(value, { loose: true })),
        },
      }),
      to: t.arg.string({
        description: `The version to end at, **inclusive**. Leave empty to end at the current version (${CURRENT_VERSION}).`,
        // validate: {
        //   refine: (value) => Boolean(SemVer.valid(value, { loose: true })),
        // },
        defaultValue: CURRENT_VERSION,
      }),
    },
    async resolve(_, { from, to, sort, ...connectionArgs }, { user }) {
      if (!from) {
        if (!user) {
          throw new GraphQLError(
            'Provide a value for the "from" argument or authenticate as a user.',
          );
        }
        const { latestVersionSeenInChangelog } = await prisma.user.findUniqueOrThrow({
          where: { id: user.id },
          select: { latestVersionSeenInChangelog: true },
        });
        from = latestVersionSeenInChangelog ?? '0.0.0';
      }

      return resolveArrayConnection(
        { args: connectionArgs },
        await getChangelogsInVersionRange(from, to, sort),
      );
    },
  }),
);