import React from 'react'
import { useStateValue } from './StateProvider'
import CheckoutProduct from "./CheckoutProduct";
import './Checkout.css'
import Subtotal from './Subtotal'

function Checkout() {
    const [{basket,user}] = useStateValue();

    return (
      <div className="checkout">
        <div className="checkout__left">
          <img
            className="checkout__ad"
            src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/ILB_BrightColors_Approved._TTW_.jpg"
            alt=""
          />
          <h3>Hello, {user?.email}</h3>
          {basket?.length === 0 ? (
            <div className="checkout__basketState">
              <h2>Your Shopping Basket is empty</h2>
              <p>
                You have no items in your basket. To buy one or more items,
                click "Add to basket" next to the item
              </p>
            </div>
          ) : (
            <div className="checkout__basketState">
              <h2>Your Shopping Basket</h2>
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          )}
        </div>
        {basket.length > 0 && (
          <div className="checkout__right">{<Subtotal />}</div>
        )}
      </div>
    );
}

export default Checkout
