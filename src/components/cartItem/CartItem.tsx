import { FC } from 'react';
import { CartContainer, ItemDetails, ItemImg, ItemName } from './cartItem-styles';
import { CartItem as TCartItem } from '../../store/cart/cartTypes';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {

    const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartContainer>
        <ItemImg src={imageUrl} alt={`${name}`} />
        <ItemDetails>
          <ItemName>{name}</ItemName>
          <span className='price'>{quantity} x ${price}</span>
        </ItemDetails>
    </CartContainer>
  )
}

export default CartItem;
