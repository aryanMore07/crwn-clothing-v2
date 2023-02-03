import { CheckoutItemContainer, CheckoutImageContainer, CheckoutImageTag, CheckoutItemNP, CheckoutItemQ, CheckoutArrowBtns, CheckoutValue, CheckoutRemoveBtn } from './checkoutItem-styles';
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from '../../store/cart/cartSelector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cartAction';


const CheckoutItem = ( { cartItem } ) => {
    
    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

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
