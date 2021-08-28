import { Publisher, Subjects, TicketCreatedEvent } from '@devneering/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
