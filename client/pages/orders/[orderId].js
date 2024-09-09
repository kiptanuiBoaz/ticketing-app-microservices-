import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: "/api/payments",
        method: "post",
        body: {
            orderId: order.id,
        },

        onSuccess: () => Router.push("/orders"),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const milisecondsLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(milisecondsLeft / 1000));
        };

        findTimeLeft();//for the first time

        const timerId = setInterval(findTimeLeft, 1000);

        //clean up timer when we navigate away from the component/ rerender
        return () => {
            clearInterval(timerId);
        };
    }, []);

    if (timeLeft < 0) {
        return <div>Order expired</div>;
    }

    return (
        <div>
            Time left to pay: {timeLeft} seconds
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })} //pass token as props to do request to be merged with body
                stripeKey="pk_test_51NGke0L5e95ib4hZ3E9l9TV3NgxheqAgEf0lHzQzHgIr8JEqnhjLbCcuVX36DMczlY8xmHY7TuL2uNXXHdTirVtj00KclJQ58K"
                amount={order.ticket.price * 100}
                email={currentUser.email}
            />
            {errors}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;