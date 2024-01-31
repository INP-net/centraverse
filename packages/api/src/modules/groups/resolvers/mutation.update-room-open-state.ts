import { builder, log, prisma } from '#lib';
import {} from '#modules/global';
import { userIsMemberOf } from '#permissions';
// TODO rename to update-group-room-open-state

builder.mutationField('updateRoomOpenState', (t) =>
  t.field({
    type: 'Boolean',
    description: "Changer si la salle d'un groupe est fermé ou ouvert",
    args: {
      groupUid: t.arg.string({ description: "L'uid du groupe" }),
      openRoom: t.arg.boolean({
        description: 'Vrai si on veut indiquer que le local est maintenant ouvert ',
      }),
    },
    authScopes(_, { groupUid }, { user }) {
      return Boolean(user?.canEditGroups || userIsMemberOf(user, groupUid));
    },
    async resolve(_, { groupUid, openRoom }, { user }) {
      const { roomIsOpen } = await prisma.group.update({
        where: { uid: groupUid },
        data: { roomIsOpen: openRoom },
      });

      await log('groups', 'set-room', { open: openRoom }, groupUid, user);

      return roomIsOpen;
    },
  }),
);
