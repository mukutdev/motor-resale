import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import CheckoutForm from './CheckoutForm/CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

console.log(stripePromise);
const Payment = () => {
    const {id} = useParams()

    const {data : booking ={} , isLoading } = useQuery({
        queryKey : ['bookings'],
        queryFn : async ()=>{
            const res = await fetch(`https://resale-server-mukutdev.vercel.app/bookings/${id}`)
            const data = await res.json()
            return data;
        }
    })

    if(isLoading){
        return <SpinnerCircular/>
    }

    return (
        <section>
            <div className='container mx-auto w-2/5 my-20'>
                <div className='bg-gray-50 shadow rounded-md p-10'>

                    <h2 className='text-xl font-medium text-center'>Please Pay for {booking.carName} </h2>
                     <h4 className='text-center my-5 font-medium'>Price : ${booking?.salePrice}</h4>
                     <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm booking={booking}></CheckoutForm>
                        </Elements>
                     </div>

                </div>

            </div>
        </section>
    );
};

export default Payment;