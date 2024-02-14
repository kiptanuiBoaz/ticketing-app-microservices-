import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
} from "@gittixteam/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}