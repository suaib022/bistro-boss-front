import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxios from "../../../Hooks/UseAxiosSecure";
import UseCart from "../../../Hooks/UseCart";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const CheckOutForm = () => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = UseAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = UseAxios();
    const [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('error', error);
            setError(error.message);
        }
        else {
            console.log('method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // save the payment in database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    transactionId: paymentIntent.id,
                    status: 'Pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Thank You For the Paisa",
                        showCancelButton: false,
                        timer: 1500
                    })
                }
                refetch();
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className="my-4 btn btn-outline btn-md" disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className="text-red-600 text-2xl">{error}</p>
            {transactionId && <p className="text-green-500"> Payment Succeed <br />Your Transaction Id : {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;