import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BUTTON_TYPE_CLASSES } from "../button/Button";
import { PaymentFormContainer, FormContainer, PaymentButton } from './paymentFormStyles';
import { selectCartTotal } from '../../store/cart/cartSelector';
import { selectCurrentUser } from '../../store/user/userSelector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);


    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        };

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/createPaymentIntent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'guest',
                    address: {
                        line1: '510 Townsend St',
                        postal_code: '98140',
                        city: 'San Francisco',
                        state: 'CA',
                        country: 'US',
                    },
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            toast.error(paymentResult.error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                toast.success('Payment Successful 😄', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }

    }

    return (
        <PaymentFormContainer>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h3>Debit/Credit CARD PAYMENT: </h3>
            <FormContainer onSubmit={paymentHandler}>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>PAY NOW</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;