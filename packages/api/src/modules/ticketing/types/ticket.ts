import { builder, prisma, toHtml } from '#lib';
import { MajorType } from '#modules/curriculum';
import { DateTimeScalar } from '#modules/global';
import { PaymentMethodEnum, priceWithPromotionsApplied as actualPrice } from '#modules/payments';
import { SchoolType } from '#modules/schools';
import { canBookTicket, shotgunIsOpen } from '#modules/ticketing/utils';
import type { Prisma } from '@churros/db/prisma';

export const TicketTypePrismaIncludes = {
  group: true,
  openToMajors: true,
} as const satisfies Prisma.TicketInclude;

export const TicketType = builder.prismaNode('Ticket', {
  id: { field: 'id' },
  include: TicketTypePrismaIncludes,
  fields: (t) => ({
    eventId: t.exposeID('eventId'),
    uid: t.exposeString('slug', {
      deprecationReason: 'Use `slug` instead. This field was never universally unique.',
    }),
    slug: t.exposeString('slug', {
      description: 'Un nom lisible sans espaces, adaptés pour des URLs.',
    }),
    ticketGroupId: t.exposeID('ticketGroupId', { nullable: true }),
    name: t.exposeString('name'),
    fullName: t.string({
      description: "Full name, including the ticket group's name if any",
      resolve({ name, group }) {
        return group ? `${group.name} - ${name}` : name;
      },
    }),
    description: t.exposeString('description'),
    descriptionHtml: t.string({ resolve: async ({ description }) => toHtml(description) }),
    opensAt: t.expose('opensAt', { type: DateTimeScalar, nullable: true }),
    closesAt: t.expose('closesAt', { type: DateTimeScalar, nullable: true }),
    open: t.boolean({
      description: 'Si le shotgun du billet est ouvert',
      resolve: shotgunIsOpen,
    }),
    basePrice: t.exposeFloat('price'),
    price: t.float({
      async resolve(ticket, _, { user }) {
        return actualPrice(ticket, user);
      },
    }),
    capacity: t.exposeInt('capacity', { nullable: true }),
    registrations: t.relation('registrations', {
      authScopes: { loggedIn: true },
      query(_, { user }) {
        if (!user) return { where: { OR: [] } };
        if (user.admin) return {};

        return {
          where: {
            OR: [
              { author: { uid: user.uid } },
              { beneficiary: user.uid },
              { ticket: { event: { managers: { some: { user: { uid: user.uid } } } } } },
            ],
          },
        };
      },
    }),
    links: t.relation('links'),
    allowedPaymentMethods: t.expose('allowedPaymentMethods', {
      type: [PaymentMethodEnum],
    }),
    openToPromotions: t.expose('openToPromotions', { type: ['Int'] }),
    openToAlumni: t.exposeBoolean('openToAlumni', { nullable: true }),
    openToExternal: t.exposeBoolean('openToExternal', { nullable: true }),
    openToSchools: t.prismaField({
      type: [SchoolType],
      description: 'Écoles telles que toutes leur filières sont autorisées sur ce billet',
      async resolve(query, { openToMajors }) {
        return prisma.school.findMany({
          ...query,
          where: {
            majors: {
              every: {
                OR: [{ id: { in: openToMajors.map((m) => m.id) } }, { discontinued: true }],
              },
            },
          },
        });
      },
    }),
    cannotBookReason: t.string({
      nullable: true,
      description:
        "Un message d'explication sur pourquoi la personne connectée peut réserver ce billet pour quelqu'un d'autre. Null si la personne peut.",
      args: {
        themself: t.arg.boolean({
          description: 'On souhaite réserver pour soi-même',
        }),
      },
      async resolve({ id }, { themself }, { user }) {
        const [can, whynot] = canBookTicket(
          user,
          user
            ? await prisma.user.findUniqueOrThrow({
                where: { id: user.id },
                include: canBookTicket.userPrismaIncludes,
              })
            : null,
          themself ? null : 'someone else',
          await prisma.ticket.findUniqueOrThrow({
            where: { id },
            include: canBookTicket.prismaIncludes,
          }),
        );
        return can ? null : whynot;
      },
    }),
    openToGroups: t.relation('openToGroups'),
    openToMajors: t.prismaField({
      type: [MajorType],
      args: {
        smart: t.arg.boolean({
          defaultValue: false,
          description:
            "Ne renvoyer que les filières qui ne consistuent pas ensemble la totalité des filières d'une école. Pratique pour l'affichage sur un billet, en combinant avec openToSchools",
        }),
      },
      async resolve(query, { openToMajors, id }, { smart }) {
        if (!smart) {
          return prisma.major.findMany({
            ...query,
            where: {
              accessibleTickets: {
                some: { id },
              },
            },
          });
        }

        const openToSchools = await prisma.school.findMany({
          ...query,
          where: {
            majors: {
              every: {
                OR: [{ id: { in: openToMajors.map((m) => m.id) } }, { discontinued: true }],
              },
            },
          },
        });

        return prisma.major.findMany({
          ...query,
          where: {
            accessibleTickets: { some: { id } },
            schools: { none: { id: { in: openToSchools.map((s) => s.id) } } },
          },
        });
      },
    }),
    openToContributors: t.exposeBoolean('openToContributors', { nullable: true }),
    openToApprentices: t.exposeBoolean('openToApprentices', { nullable: true }),
    godsonLimit: t.exposeInt('godsonLimit'),
    onlyManagersCanProvide: t.exposeBoolean('onlyManagersCanProvide'),
    autojoinGroups: t.relation('autojoinGroups'),
    event: t.relation('event'),
    group: t.relation('group', { nullable: true }),
    remainingGodsons: t.int({
      nullable: true,
      description: 'Nombre de parrainages restants. Null pour illimité',
      async resolve({ godsonLimit, eventId }, _, { user }) {
        // No godsons for external users, since godson limits can't be reasonably enforced
        if (!user?.major) return 0;
        const { managers } = await prisma.event.findUniqueOrThrow({
          where: { id: eventId },
          include: {
            managers: true,
          },
        });
        if (
          managers.some(
            ({ userId, canVerifyRegistrations }) => canVerifyRegistrations && user.id === userId,
          )
        )
          return null;
        const bookingsForOthers = await prisma.registration.findMany({
          where: {
            ticket: { event: { id: eventId } },
            author: { uid: user.uid },
            // for someone else: either...
            OR: [
              {
                // a churros beneficiary: not themself, not null
                AND: [
                  { internalBeneficiaryId: { not: user.id } },
                  { internalBeneficiaryId: { not: null } },
                ],
              },
              {
                // an external beneficiary. (not null, not empty)
                AND: [{ externalBeneficiary: { not: null } }, { externalBeneficiary: { not: '' } }],
              },
            ],
          },
        });
        return godsonLimit - bookingsForOthers.length;
      },
    }),
  }),
});
