import './CartDropDown.scss';
import Button from '../button/Button'

const CartDropDown = () => {
  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items' />
        <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropDown;
