import {
    Subjects,
    Publisher,
    PaymentCreatedEvent,
} from "@gittixteam/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}