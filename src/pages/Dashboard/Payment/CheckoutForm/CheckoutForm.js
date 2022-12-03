import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [trxId, setTrxId] = useState("");
  const [processing , setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { salePrice , customer , cusEmail , _id } = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://resale-server-mukutdev.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ salePrice }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [salePrice]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setSuccess('')
    setProcessing(true)
    const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: customer,
              email:cusEmail
            },
          },
        },
      );

      if(confirmError){
        setCardError(confirmError.message)
        return;
      }

      if(paymentIntent.status === 'succeeded'){

        const payment = {
          name:customer,
          email : cusEmail,
          trxId : paymentIntent.id,
          bookingId : _id
        }
       
        fetch('https://resale-server-mukutdev.vercel.app/payments',{
          method : 'POST',
          headers :{
            'content-type' : 'application/json'
          },
          body : JSON.stringify(payment)
        })
        .then(res => res.json())
        .then(data =>{
          if(data.insertedId){
            console.log(data);
            console.log(paymentIntent);
            setSuccess('Congratulations ! Payment Successful')
            setTrxId(`Your transaction id is ${paymentIntent.id}`)
            toast.success('Congratulations ! Payment Successful')
          }
        })
       
      }

      setProcessing(false)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="my-4 bg-yellow-400 px-5 font-medium py-1 hover:bg-yellow-500 text-slate-700 rounded"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-red-600 mt-2 font-medium">{cardError}</p>
      <>
          {
            success && <>
            <span className="text-green-700"> {success}</span>
            <span className="text-green-700 mt-2"> {trxId}</span>
            </>
          }
      </>
    </>
  );
};

export default CheckoutForm;
