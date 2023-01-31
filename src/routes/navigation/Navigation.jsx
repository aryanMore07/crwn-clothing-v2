import React, { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import './navigation-styles.jsx';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import { signOutUser } from '../../utils/firebase/Firebase';
import CartIcon from '../../components/cartIcon/CartIcon';
import CartDropDown from '../../components/cartDropDown/CartDropDown';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation-styles';


const Navigation = () => {
  
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
