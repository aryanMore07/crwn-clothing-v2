import React from 'react'
import { CheckoutContainer, CheckoutHeader, CheckoutHeaderBlock, CheckoutTotal } from './checkout-styles';

import CheckoutItem from '../checkoutItem/CheckoutItem';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cartSelector';

const CheckOut = () => {


    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

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
