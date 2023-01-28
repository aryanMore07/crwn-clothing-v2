import { useContext } from 'react';
import './CartDropDown.scss';
import Button from '../button/Button'
import CartItem from '../cartItem/CartItem';
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDropDown = () => {

    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    
    const checkOutBtnHandeler = () => {
        navigate('/checkout')    
    }

    return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
        </div>
        <Button onClick={checkOutBtnHandeler}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropDown;
