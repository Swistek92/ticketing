import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@ps_tickets/common';

export class ExpirationComplePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
