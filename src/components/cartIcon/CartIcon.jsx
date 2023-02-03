import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cartAction';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cartSelector';
import { CartIconDiv, ShoppingIconDiv, ItemCountDiv } from './cartIcon-styles';

const CardIcon = () => {

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconDiv className='cart-icon-container' onClick={toggleIsCartOpen}>
        <ShoppingIconDiv className='shopping-icon' /> 
        <ItemCountDiv className='item-count'>{cartCount}</ItemCountDiv>     
    </CartIconDiv>
  )
}

export default CardIcon;
