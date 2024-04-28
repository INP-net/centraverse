import { builder, prisma } from '#lib';

builder.mutationField('updateSchool', (t) =>
  t.field({
    type: 'School',
    args: {
      uid: t.arg.string(),
      name: t.arg.string(),
      address: t.arg.string(),
      description: t.arg.string(),
      internalMailDomain: t.arg.string(),
      aliasMailDomains: t.arg.stringList(),
    },
    async authScopes(_, {}, { user }) {
      return Boolean(user?.admin);
    },
    async resolve(
      _,
      { uid, name, address, description, internalMailDomain, aliasMailDomains },
      { user },
    ) {
      await prisma.logEntry.create({
        data: {
          area: 'school',
          action: 'update',
          target: uid,
          message: `School ${uid} updated`,
          user: user ? { connect: { id: user.id } } : undefined,
        },
      });
      return prisma.school.update({
        where: { uid },
        data: {
          name,
          address,
          description,
          internalMailDomain,
          aliasMailDomains,
        },
      });
    },
  }),
);
