import {
    OrderCreatedEvent,
    Publisher,
    Subjects,
} from "@gittixteam/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}