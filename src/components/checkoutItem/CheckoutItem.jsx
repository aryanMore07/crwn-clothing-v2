import { CheckoutItemContainer, CheckoutImageContainer, CheckoutImageTag, CheckoutItemNP, CheckoutItemQ, CheckoutArrowBtns, CheckoutValue, CheckoutRemoveBtn } from './checkoutItem-styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

const CheckoutItem = ( { cartItem } ) => {
    
    const { name, imageUrl, price, quantity } = cartItem;

    const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <CheckoutImageContainer>
                <CheckoutImageTag src={imageUrl} alt={`${name}`} />
            </CheckoutImageContainer>
            <CheckoutItemNP>{ name }</CheckoutItemNP>
            <CheckoutItemQ >
                <CheckoutArrowBtns onClick={removeItemHandler}>
                    &#10094;
                </CheckoutArrowBtns>
                <CheckoutValue>{ quantity }</CheckoutValue>
                <CheckoutArrowBtns onClick={addItemHandler}>
                    &#10095;
                </CheckoutArrowBtns>
            </CheckoutItemQ>
            <CheckoutItemNP>{ price }</CheckoutItemNP>
            <CheckoutRemoveBtn onClick={clearItemHandler}>&#10005;</CheckoutRemoveBtn>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;
