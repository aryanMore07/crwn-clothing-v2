import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { CartIconDiv, ShoppingIconDiv, ItemCountDiv } from './cartIcon-styles';

const CardIcon = () => {

  const { isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconDiv className='cart-icon-container' onClick={toggleIsCartOpen}>
        <ShoppingIconDiv className='shopping-icon' /> 
        <ItemCountDiv className='item-count'>{cartCount}</ItemCountDiv>     
    </CartIconDiv>
  )
}

export default CardIcon;
