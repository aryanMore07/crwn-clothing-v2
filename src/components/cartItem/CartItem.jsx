import { CartContainer, ItemDetails, ItemImg, ItemName } from './cartItem-styles';

const CartItem = ({ cartItem }) => {

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
