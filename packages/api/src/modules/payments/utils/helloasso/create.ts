import type { Event, Ticket, TicketGroup } from '@prisma/client';
import { fullName } from '../../../ticketing/utils/naming.js';
import { client, defaultOrganization } from './auth.js';

export async function createHelloAssoEvent(
  event: Event & { tickets: Array<Ticket & { group: TicketGroup | null }> },
): Promise<string> {
  const org = await defaultOrganization();
  const result = await client
    .call(`/v5/${org}/forms/Event/action/quick-create`, {}, 'POST', {
      tierList: event.tickets.map((ticket) => ({
        label: fullName(ticket.group, ticket.name),
        price: ticket.price,
      })),
      description: event.description,
      title: event.title,
      activityTypeId: 1,
      place: {
        name: event.location,
      },
      startDate: event.startsAt,
      saleStartDate: earliestDate(event.tickets.map((t) => t.opensAt)),
      saleEndDate: lastDate(event.tickets.map((t) => t.closesAt)),
      acceptOpenDonation: false,
      allowComment: false,
      amountVisibile: false,
      generateTickets: false,
    })
    .then((r) => r.json());
  return result.formSlug;
}

function earliestDate(dates: Array<Date | null | undefined>): string {
  return new Date(Math.min(...dates.filter(Boolean).map((d) => d!.getTime()))).toISOString();
}

function lastDate(dates: Array<Date | null | undefined>): string {
  return new Date(Math.max(...dates.filter(Boolean).map((d) => d!.getTime()))).toISOString();
}
