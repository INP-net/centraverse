import { builder, prisma } from '#lib';
import { GraphQLError } from 'graphql';

import { createTransport } from 'nodemailer';
import { prismaUserFilterForStudentAssociationAdmins } from '../utils/index.js';

// TODO rename registration to reject-user-candidate

builder.mutationField('refuseRegistration', (t) =>
  t.field({
    authScopes: { studentAssociationAdmin: true },
    type: 'Boolean',
    args: { email: t.arg.string(), reason: t.arg.string() },
    async resolve(_, { email, reason }, { user }) {
      if (!user) throw new GraphQLError("Vous n'êtes pas connecté·e");

      let candidate = await prisma.userCandidate.findUnique({
        where: { email, ...prismaUserFilterForStudentAssociationAdmins(user) },
      });
      if (!candidate) throw new GraphQLError('Candidat·e introuvable');

      const mailer = createTransport(process.env.SMTP_URL);
      await mailer.sendMail({
        to: email,
        from: process.env.PUBLIC_SUPPORT_EMAIL,
        subject: 'Inscription refusée',
        text: `Votre inscription a été refusée pour la raison suivante:\n\n ${reason}\n\n Si vous pensez qu'il s'agit d'une erreur, répondez à ce mail.`,
        html: `<p>Votre inscription a été refusée pour la raison suivante:<br><br> ${reason}<br><br> Si vous pensez qu'il s'agit d'une erreur, répondez à ce mail</p>`,
      });
      candidate = await prisma.userCandidate.delete({ where: { email } });
      await prisma.logEntry.create({
        data: {
          action: 'refuse',
          area: 'signups',
          message: `Refus de l'inscription de ${email} pour ${reason}`,
          user: { connect: { id: user!.id } },
          target: `token ${candidate.token}`,
        },
      });
      return true;
    },
  }),
);
