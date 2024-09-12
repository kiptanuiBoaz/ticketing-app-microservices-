import Queue from "bull";
import { natsWrapper } from "../nats-wrapper";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-compelete-publisher";

interface Payload {
  orderId: string;
}

//enqueue the job insid redis
const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

//flag the order as expired
expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };