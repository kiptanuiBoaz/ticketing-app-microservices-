import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import {
    Listener,
    ExpirationCompleteEvent,
    Subjects,
    OrderStatus,
} from "@gittixteam/common";
import { Message } from "node-nats-streaming";
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    queueGroupName = queueGroupName;
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

    async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
        const order = await Order.findById(data.orderId).populate("ticket");

        if (!order) {
            throw new Error("Order not found");
        }

        //do not cancel the order if payment is complete
        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }

        order.set({
            status: OrderStatus.Cancelled,
        });
        await order.save();

        //publish an event communicating that an order has been cancelled
        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id,
            },
        });

        //finally acknowledge event recipiency
        msg.ack();
    }
}