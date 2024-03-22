import { CURRENT_VERSION, builder, prisma } from '#lib';
import { SortDirection, SortDirectionEnum } from '#modules/global';
import { GraphQLError } from 'graphql';
import * as SemVer from 'semver';
import { getChangelogsInVersionRange, type ReleaseChangesMap } from '../index.js';
import { ChangelogCombinedReleasesType } from '../types/changelog-combined-releases.js';

builder.queryField('combinedChangelog', (t) =>
  t.field({
    type: ChangelogCombinedReleasesType,
    errors: {},
    description: `A changelog for multiple versions, with all changes combined.
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
    async resolve(_, { from, to, sort }, { user }) {
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

      const allReleases = await getChangelogsInVersionRange(from, to, sort);

      // Merge all changes
      let mergedChanges: ReleaseChangesMap = {
        added: [],
        fixed: [],
        security: [],
        improved: [],
        other: [],
        technical: [],
      };

      for (const release of allReleases) {
        mergedChanges = {
          added: [...mergedChanges.added, ...release.changes.added],
          fixed: [...mergedChanges.fixed, ...release.changes.fixed],
          security: [...mergedChanges.security, ...release.changes.security],
          improved: [...mergedChanges.improved, ...release.changes.improved],
          other: [...mergedChanges.other, ...release.changes.other],
          technical: [...mergedChanges.technical, ...release.changes.technical],
        };
      }

      return {
        versions: allReleases.map((release) => release.version),
        changes: mergedChanges,
      };
    },
  }),
);
