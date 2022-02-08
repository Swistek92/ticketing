import { Publisher, OrderCreatedEvent, Subjects } from '@ps_tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OderCreated = Subjects.OderCreated;
}
