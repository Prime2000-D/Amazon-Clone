import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, title,image,price,rating,hideButton}) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id:id,
        })
    }
    return (
      <div className="checkoutProduct">
        <img src={image} alt="" />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_) => {
                return <p>⭐</p>;
              })}
          </div>
          <p className="checkoutProduct__price">
            <small>₹</small>
            <strong> {price.toLocaleString()}</strong>
          </p>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from basket</button>
          )}
        </div>
      </div>
    );
}

export default CheckoutProduct
