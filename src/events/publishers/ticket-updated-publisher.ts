import { Publisher, Subjects, TicketUpdatedEvent } from '@devneering/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
