import React, { useContext } from 'react'
import { CheckoutContainer, CheckoutHeader, CheckoutHeaderBlock, CheckoutTotal } from './checkout-styles';
import { CartContext } from '../../contexts/CartContext';
import CheckoutItem from '../checkoutItem/CheckoutItem';

const CheckOut = () => {

    const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
        <CheckoutHeader>
            <CheckoutHeaderBlock>
                <span>Product</span>
            </CheckoutHeaderBlock>
            <CheckoutHeaderBlock>
                <span>Description</span>
            </CheckoutHeaderBlock>
            <CheckoutHeaderBlock>
                <span>Quantity</span>
            </CheckoutHeaderBlock>
            <CheckoutHeaderBlock>
                <span>Price</span>
            </CheckoutHeaderBlock>
            <CheckoutHeaderBlock>
                <span>Remove</span>
            </CheckoutHeaderBlock>
        </CheckoutHeader>
            {
                cartItems.map((cartItem) => ( <CheckoutItem key={cartItem.id} cartItem={cartItem} />))
            }
            <CheckoutTotal>Total: ${cartTotal}</CheckoutTotal>
        </CheckoutContainer>
  )
}

export default CheckOut;
