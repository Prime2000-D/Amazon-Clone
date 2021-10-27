import React from 'react'
import './Subtotal.css';
import {useStateValue} from './StateProvider'
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';

function Subtotal() {
  const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
    return (
      <div className="subtotal">
        <CurrencyFormat
            renderText={(value) => (
                <>
                   <p>
                       Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
                    </p> 
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
        />

        <button onClick={e=>(history.push('/payment'))}>Proceed to Buy</button>
      </div>
    );
}

export default Subtotal
