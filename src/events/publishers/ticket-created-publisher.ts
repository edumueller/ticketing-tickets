import { Publisher, Subjects, TicketCreatedEvent } from "@devneering/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
