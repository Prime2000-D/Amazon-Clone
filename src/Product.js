import React from 'react'
import './Product.css'
import { useStateValue } from "./StateProvider";

function Product({id, title, price, image, rating}) {
    const [{basket},dispatch] = useStateValue();
    
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }

    return (
        <div className="product">
            <img src={image} alt="" />
            <div className="product__ingo">
                <p>{title}</p>
                <div className="product__rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_) => {
                        return <p>⭐</p>
                        })
                    }
                </div>
                <p className="product__price">
                    <small>₹</small>
                    <strong> {price.toLocaleString()}</strong>
                </p>
            </div>
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
