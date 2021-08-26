import { Publisher, Subjects, TicketUpdatedEvent } from "@devneering/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
