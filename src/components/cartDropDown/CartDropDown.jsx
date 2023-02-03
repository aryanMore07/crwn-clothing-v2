import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems,
} from './CartDropDown-styles';
import Button from '../button/Button'
import CartItem from '../cartItem/CartItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cartSelector';

const CartDropDown = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const checkOutBtnHandeler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={checkOutBtnHandeler} style={{padding: '0px'}} >GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropDown;
