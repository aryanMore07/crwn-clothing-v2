import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navigation-styles.jsx';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/Firebase';
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropDown from '../../components/cartDropDown/CartDropDown';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation-styles';
import { selectCurrentUser } from '../../store/user/userSelector.js';
import { selectIsCartOpen } from '../../store/cart/cartSelector.js';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const signOutHandler = async () => {
    await signOutUser();
  }
  
  return (
    <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <div>
                    <CrownLogo className='logo' />
                </div>
            </LogoContainer>
            <NavLinks >
                <NavLink to='/shop'>SHOP</NavLink>
                { currentUser ? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>) : (<NavLink to='/auth'>SIGN IN</NavLink>) } 
              <CartIcon />
            </NavLinks>
              {isCartOpen && <CartDropDown />}
        </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
