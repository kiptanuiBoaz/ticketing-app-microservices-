import {
    OrderCancelledEvent,
    Publisher,
    Subjects,
} from "@gittixteam/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}