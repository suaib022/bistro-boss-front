import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../../Components/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
const Payment = () => {

    // TODO :add publishable key
    const stripePromise = loadStripe(import.meta.env.VITE_PK);

    return (
        <div>
            <SectionTitle heading={"Payment"} subHeading={"!!!!!!! Tekaaa !!!!!!!"}></SectionTitle>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;