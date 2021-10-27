import React from 'react'
import moment from 'moment'
import './Order.css'
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({order}) {
    return (
      <div className="order">
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mm a")}</p>
        <p className="order__id">
          <small>{order.id}</small>
        </p>
        {order.data.basket?.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton
          />
        ))}
        <CurrencyFormat
          renderText={(value) => (
            <h4 className="order__total">Order Total:{value}</h4>
          )}
          value={order.data.amount/100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
        />
      </div>
    );
}

export default Order
