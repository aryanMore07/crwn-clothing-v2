import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cartAction';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cartSelector';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount } from './cartIcon-styles';

const CardIcon = () => {

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CardIcon;
