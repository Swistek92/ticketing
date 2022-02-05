import { Publisher, Subjects, TicketUpdatedEvent } from '@ps_tickets/common';

export class TickertUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
