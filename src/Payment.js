import { ListItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider'
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase'
import { setDoc, doc } from "firebase/firestore"; 

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const [processing, setProcessing] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method : 'post',
                url : `/payment/create?total=${getBasketTotal(basket)*100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log('The Secret key is >>>', clientSecret);
    console.log('user', user);

    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            // Namedspace method
            // db.collection("users")
            // .doc(user?.uid)
            // .collection("orders")
            // .doc(paymentIntent.id)
            // .set({
            //   basket: basket,
            //   amount: paymentIntent.amount,
            //   created: paymentIntent.created,
            // });

            (async () => {
              await setDoc(
                doc(db, "users", user?.uid, "orders", paymentIntent.id),
                {
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created,
                }
              );
            })();

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch(
              {
                type: 'EMPTY_BASKET'
              }
            )

            history.replace('/orders')
        })
    }
    const handleChange = (e) => {
        setDisabled(e.empty);
        setError (e.error ? e.error.message : "")
    };
    
    return (
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout({<Link to="/checkout">{basket?.length} items</Link>})
          </h1>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              {user?.email}
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Detail</h3>
            </div>
            <div className="payment__detail">
              <form onSubmit={handleSubmit} action="">
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                        renderText={(value) => (
                        <>
                           <h3>Order Total: {value}</h3>
                        </>
                        )}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"???"}
                    />
                    <button className="payment__button" disabled={processing || disabled || succeeded}>
                        <span>{processing ? <p>Processing</p>: 'Buy Now'}</span>
                    </button>
                </div>
                {error && <div> {error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Payment
