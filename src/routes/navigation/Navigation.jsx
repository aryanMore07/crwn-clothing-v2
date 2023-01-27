import React, { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './navigation.scss';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { signOutUser } from '../../utils/firebase/Firebase';
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropDown from '../../components/cartDropDown/CartDropDown';


const Navigation = () => {
  
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  }
  
  return (
    <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <div>
                    <CrownLogo className='logo' />
                </div>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>SHOP</Link>
                { currentUser ? (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>SIGN IN</Link>) } 
              <CartIcon />
            </div>
              {isCartOpen && <CartDropDown />}
        </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
